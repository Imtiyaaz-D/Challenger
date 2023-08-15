const express = require('express')
const bodyparser = require('body-parser')
const routes = express.Router()
const {users} = require('../model')

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