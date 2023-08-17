const express = require('express')
const bodyparser = require('body-parser')
const routes = express.Router()
const {verifyAToken} = require('../middleware/AuthenticateUser')
const {users, books, authors, orders} = require('../model')

const {user} = require('../model')


// =============User`s routes=================
routes.get('/user',(req,res)=>{
    users.fecthUsers(req,res)
})

routes.get('/user/:id', (req , res)=>{
    users.fetchUser(req,res)
})

routes.post('/register', bodyparser.json(),(req, res)=>{
    users.updateUser(req, res)
})

routes.put('/user/:id', bodyparser.json(),(req, res)=>{
    users.updateUser(req,res)
}
)
routes.patch('/user/:id', bodyparser.json(),(req,res)=>{
    users.updateUser(req, res)
})
routes.delete('/user/:id',(req,res)=>{
    users.deleteUser(req,res)
})
routes.post('/login',bodyparser.json(), (req, res)=>{
    users.login(req, res)
})
module.exports = {
    express,
    routes
}