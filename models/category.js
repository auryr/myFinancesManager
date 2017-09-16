const db = require('../db/config');
const Category = {

    create : function(category){
        return db.one(`INSERT INTO category(name, description, include , operation , user_id)
                VALUES( $1, $2, $3, $4, $5) RETURNING *`,
                [category.name, category.description, category.include, category.operation,category.user_id])
     },

    update : function(category){
    return db.one(`UPDATE category set name=$1, description=$2, include=$3, operation=$4
                    WHERE  user_id=$5  and id=$6 RETURNING *`,
                [category.name, category.description,category.include, category.operation, category.user_id, category.id])
    },

    findAll : function(user_id){
        return db.query("SELECT u.username, concat(u.firstname , ' ' , u.lastname) as fullname, c.* FROM category c INNER JOIN  users u on c.user_id= u.id  WHERE C.user_id = $1 order by c.id ",[user_id]);
    },


    findById : function(categoryId){
        return db.one("SELECT *  FROM category WHERE id=$1", [categoryId]);
    },

    delete : function(categoryId){
        return db.none("DELETE FROM category WHERE id=$1", [categoryId])
    },

}


module.exports = Category;
