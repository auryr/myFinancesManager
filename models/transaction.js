const db = require('../db/config');
const Transaction = {

    create : function(transaction){
        console.log(transaction);
        return db.one(`INSERT INTO transaction(note, trdate, amount , receipt , category_id, budget_id)
                      VALUES( $1, $2, $3, $4, $5, (select id from budget WHERE to_date($2,'yyyy-mm-dd')>= to_date(initdate, 'yyyy-mm-dd')  and to_date($2, 'yyyy-mm-dd') <= to_date(enddate, 'yyyy-mm-dd') FETCH FIRST 1 ROWS ONLY )) RETURNING *`,
                [transaction.note, transaction.trdate, transaction.amount, transaction.receipt,transaction.category_id])
     },

    update : function(transaction,id){
        return db.one(`UPDATE transaction set note=$1, trdate=$2, amount=$3, receipt=$4, category_id=$5,
                       budget_id = (select id from budget WHERE to_date($2,'yyyy-mm-dd')>= to_date(initdate, 'yyyy-mm-dd')  and to_date($2, 'yyyy-mm-dd') <= to_date(enddate, 'yyyy-mm-dd')  FETCH FIRST 1 ROWS ONLY   )
                    WHERE id=$6 RETURNING *`,
                [transaction.note, transaction.trdate, transaction.amount, transaction.receipt, transaction.category_id, transaction.id])
    },

    findAll : function(user_id){
        return db.query("SELECT t.*,c.name,c.operation FROM transaction t inner join category c on t.category_id = c.id  WHERE user_id=$1 ",[user_id]);
    },

    findById : function(transactionId){
        return db.one("SELECT *  FROM transaction WHERE id=$1", [transactionId]);
    },

    findByDate : function(filter){
        return db.query("SELECT t.*,c.name,c.operation FROM transaction t inner join category c on t.category_id = c.id  WHERE user_id=$1  and to_date(trdate, 'yyyy-mm-dd') >=   to_date($2,'yyyy-mm-dd') and  to_date(trdate, 'yyyy-mm-dd') <= to_date($3, 'yyyy-mm-dd')  order by  to_date(trdate, 'yyyy-mm-dd') ",[ filter.user_id, filter.initdate,filter.enddate]);
    },

    delete : function(transactionId){
        return db.none("DELETE FROM transaction WHERE id=$1", [transactionId])
    },

    findByBudget : function(user_id){
          return db.query(`select b.name, b.initdate ,b .enddate, b.amount as budget, ex.amount as expenses , inc.amount as incomes from budget b  full join (select c.user_id,sum(t.amount) as amount , t.budget_id, c.operation from transaction t inner join category c on t.category_id = c.id WHERE c.operation='-' group by c.user_id,t.budget_id, c.operation)  as ex on ex.budget_id = b.id  full join (select c.user_id,sum(t.amount) as amount , t.budget_id, c.operation from transaction t inner join category c on t.category_id = c.id WHERE c.operation='+' group by c.user_id,t.budget_id, c.operation

            ) as inc on inc.budget_id = b.id  WHERE  b.user_id=$1 order by b.initdate desc`,[user_id])
    }

}


module.exports = Transaction;
