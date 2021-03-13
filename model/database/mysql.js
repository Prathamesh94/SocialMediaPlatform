require('dotenv').config('../../.env')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbname
});
function storeUser(first_name, last_name, user_id, avatar_file_path) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users(first_name,last_name,user_id,avatar_file_path) VALUES('${first_name}','${last_name}','${user_id}','${avatar_file_path}')`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });
    })
}
function storeFriends(user_id, friend_id, relationship_id) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO friends(user_id,friend_id,relationship_id) VALUES('${user_id}','${friend_id}','${relationship_id}')`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });
    })
}
function fetchUsers(offset, limit) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users LIMIT ${offset},${limit};`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });
    })
}
function fetchFriends(user_id, offset, limit) {
    return new Promise((resolve, reject) => {
        connection.query(`select users.user_id,users.first_name,users.last_name,friends.friend_id 
                            from friends inner join users on users.user_id=friends.friend_id 
                            where friends.user_id = '${user_id}' OR friends.friend_id = '${user_id}' 
                                LIMIT ${offset},${limit};`,
            function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
    })
}
function fetchFriendsOfFriends(user_id, offset, limit) {
    return new Promise((resolve, reject) => {
        connection.query(`select u1.user_id,u1.first_name,u1.last_name,a.friend_id 
                            from friends a
                            inner join friends b on a.friend_id=b.user_id
                            inner join users u1 on u1.user_id=b.friend_id 
                            where a.user_id = '${user_id}'
                                LIMIT ${offset},${limit};`,
            function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
    })
}
exports.storeUser = storeUser
exports.storeFriends = storeFriends
exports.fetchUsers = fetchUsers
exports.fetchFriends = fetchFriends
exports.fetchFriendsOfFriends = fetchFriendsOfFriends