const db = require('../db/config');
const Budget = {

  // budget
    create : function(budget){
        return db.one(`INSERT INTO budget(name, description, include , operation , user_id)
                VALUES( $1, $2, $3, $4, $5,) RETURNING *`,
                [budget.name, budget.description, budget.include, budget.operation,budget.user_id])
     },

    update : function(budget){
    return db.one(`UPDATE budget set name=$1, description=$2, include=$3
                    WHERE id=$4 and user_id=$5 RETURNING *`,
                [budget.name, budget.description,budget.include, budget.user_id, budget.id])
    },

    findAll : function(){
        return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname, c.* FROM budget c INNER JOIN  users u on c.user_id= u.id order by c.id ");
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
