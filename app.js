const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser');
const model = require('./model/model.js')
const path = require('path');
const cors = require('cors');
//app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/script.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/script.js'));
});
app.get('/style.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
app.post('/create/user', async (req, res, next) => {
    try {
        await model.createUser(req,res);
        res.send({success:true})
    } catch (error) {
        res.send({success:false})
    }   

})
app.post('/create/friendship', async (req, res, next) => {
    try {
        await model.createFriendship(req,res);
        res.send({success:true})
    } catch (error) {
        res.send({success:false})
    }   


})
app.get('/fetch/users', async (req, res, next) => {
    try {
        const users = await model.fetchUsers(req,res);
        console.log(users)
        res.send(users)
    } catch (error) {
        res.send({success:false})
    }  
})
app.get('/fetch/users/friends', async (req, res, next) => {
    try {
        const friends = await model.fetchFriends(req,res);
        res.send(friends)
    } catch (error) {
        res.send({success:false})
    }  
})
app.get('/fetch/users/friendsOffriends', async (req, res, next) => {
    try {
        const friendsOfFriends = await model.fetchFriendsOfFriends(req,res);
        res.send(friendsOfFriends)
    } catch (error) {
        res.send({success:false})
    }  
})
app.use(function (err, req, res, next) {
    if (err.message == 'CurrencyNotSupportedwithAMEZ') {
        const error = { success: false, reason: 'American Express card is Supported only for USD' }
        res.send(error)
    } else {
        res.send({ success: false, reason: 'Internal Server Error' })
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})