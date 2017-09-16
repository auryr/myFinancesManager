const db = require('../db/config');

const User = {

    findByUserName: function(userName) {
        return db.oneOrNone(`
            SELECT *, concat(firstname , ' ' , lastname) as fullname FROM users
            WHERE username = $1
            `, [userName]);
    },

    findByUserId: function(userId){
        return db.one(`
            SELECT * , concat(firstname , ' ', lastname) as fullname FROM users
            WHERE id = $1
            `, [userId]);
    },

    findAll: function(){
        return db.query("SELECT *, concat(firstname , ' ', lastname) as fullname FROM users")
    },

    create: function(user){
        return db.one(`
            INSERT INTO users
            (username, firstname, lastname, password_digest, email, photo, auth_token, attempts, blocked)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
            RETURNING *
            `, [user.username, user.firstname, user.lastname, user.password_digest, user.email, user.photo,'', 0, false]);
    },


    update: function(user, id){
        if (user.updatePass){
            return db.none(`
                UPDATE users SET
                password_digest = $1
                WHERE id = $2
                `, [user.password_digest,id]);
        }else{
            return db.one(`
                UPDATE users SET
                username = $1,
                firstname = $2,
                lastname = $3,
                email = $4,
                photo = $5,
                auth_token = $6
                WHERE id = $7
                RETURNING *
              `, [user.username, user.firstname, user.lastname, user.email, user.photo, user.auth_token,id]);
        }
    }
}

module.exports = User;
