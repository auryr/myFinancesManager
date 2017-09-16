const db = require('../db/config');
const Transaction = {

    create : function(transaction){
        return db.one(`INSERT INTO transaction(note, trdate, amount , receipt , category_id)
                VALUES( $1, $2, $3, $4, $5) RETURNING *`,
                [transaction.note, transaction.trdate, transaction.amount, transaction.receipt,transaction.category_id])
     },

    update : function(transaction,id){
        return db.one(`UPDATE transaction set note=$1, trdate=$2, amount=$3, receipt=$4, category_id=$5
                    WHERE id=$6 RETURNING *`,
                [transaction.note, transaction.trdate, transaction.amount, transaction.receipt, transaction.category_id, transaction.id])
    },

    findAll : function(user_id){
        return db.query("SELECT t.* FROM transaction t inner join category c on t.category_id = c.id  WHERE user_id=$1 ",[user_id]);
    },

    findById : function(transactionId){
        return db.one("SELECT *  FROM transaction WHERE id=$1", [transactionId]);
    },

    delete : function(transactionId){
        return db.none("DELETE FROM transaction WHERE id=$1", [transactionId])
    },

}


module.exports = Transaction;
