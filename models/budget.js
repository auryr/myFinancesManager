const db = require('../db/config');
const Budget = {

  // budget
    create : function(budget){
        return db.one(`INSERT INTO budget(name, description, initdate , enddate , user_id)
                VALUES( $1, $2, $3, $4, $5) RETURNING *`,
                [budget.name, budget.description, budget.initdate, budget.enddate,budget.user_id])
     },

    update : function(budget){
    return db.one(`UPDATE budget set name=$1, description=$2, initdate=$3, enddate=$4
                    WHERE user_id=$5 and id=$6 RETURNING *`,
                [budget.name, budget.description ,budget.initdate,budget.enddate, budget.user_id, budget.id])
    },

    findAll : function(){
        return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname, b.* FROM budget b INNER JOIN  users u on b.user_id= u.id order by b.id ");
    },


    findUsersbudget : function(user_id){
        return db.query("SELECT * WHERE user_id=$1 order by id",[user_id]);
    },

    findById : function(budgetId){
        return db.one("SELECT * FROM budget WHERE id=$1", [budgetId]);
    },

    delete : function(budgetId){
        return db.none("DELETE FROM budget WHERE id=$1", [budgetId])
    },

}


module.exports = Budget;
