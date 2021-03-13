
const { rejects } = require('assert')
const multer = require('multer')
const db = require('./database/mysql')
const { resolve } = require('path')
async function createUser(req,res) {
    //Avatar is profile pic of user 
    //Store path to profile pic in DB
    return new Promise(async (resolve, reject) => {
        try {
            console.log(req.body.user_id)
            const filePath = await saveAvatar(req,res)
            
            const output = await db.storeUser(req.body.first_name, req.body.last_name, req.body.user_id, filePath)
            resolve(output)
        }
        catch (error) {
            reject(error)

        }

    })





}
function createFriendship(req,res) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(req.body.user_id,req.body.friend_id)
            const output = await db.storeFriends(req.body.user_id, req.body.friend_id,req.body.user_id+req.body.friend_id)
            resolve(output)
        }
        catch (error) {
            reject(error)

        }

    })

}

function saveAvatar(req,res) {
    return new Promise((resolve, reject) => {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './avatars/')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now())
            }
        })
        let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');

        upload(req, res, function (err) {

            if (req.fileValidationError) {
                reject(new Error('File not found'))
            }
            else if (!req.file) {
                reject(new Error('File not found'))
            }
            else if (err) {
                reject(err)
            }
            else if(req.file.path){
                resolve(req.file.path)
            }else{
                reject(new Error('File not found'))
            }
            
        });

    })

}
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
function fetchUsers(req) {
    return new Promise(async (resolve,reject)=>{
        try {
            const output = await db.fetchUsers(req.headers.pagesize*(req.headers.pageno-1),req.headers.pagesize)
            resolve(output)
        }
        catch (error) {
            reject(error)

        }


    })

}
function fetchFriends(req) {
    return new Promise(async (resolve,reject)=>{
        try {
            const output = await db.fetchFriends(req.headers.user_id,req.headers.pagesize*(req.headers.pageno-1),req.headers.pagesize)
            resolve(output)
        }
        catch (error) {
            reject(error)

        }


    })

}
function fetchFriendsOfFriends(req) {

    return new Promise(async (resolve,reject)=>{
        try {
            const output = await db.fetchFriendsOfFriends(req.headers.user_id,req.headers.pageSize*(req.headers.pageNo-1),req.headers.pageSize)
            resolve(output)
        }
        catch (error) {
            reject(error)

        }


    })
}
exports.createUser = createUser
exports.createFriendship = createFriendship
exports.fetchUsers = fetchUsers
exports.fetchFriends = fetchFriends
exports.fetchFriendsOfFriends = fetchFriendsOfFriends