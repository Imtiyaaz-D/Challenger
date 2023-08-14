const db = require('../config')
const {hash, compare , hashSync} = require('bcrypt')
const {createToken} = require('../middleware/AuthenticateUser')
class Users{
    fecthUsers(req, res) {
        const query = `
        SELECT userID, firstName ,lastName ,gender ,userDOB,
        emailAdd, profileUrl
        FROM Users;
        `
        db.query(query,
            (err,results)=>{
              if(err) throw err
              res.json({
                status: res.ststusCode,
                results
              })
        })
    }
    fetchUser(req, res) {
        const query = `
        SELECT userID, firstName ,lastName ,gender ,userDOB,
        emailAdd, profileUrl
        FROM Users
        WHERE userID = ${req.params.id};
        `
        db.query(query,
            (err, results)=>{
                if(err) throw err
                res.json({
                    status:res.statusCode,
                    results
                })
            })
    }
    login(req,res){
        const query =`
        `
    }
    // nothing in login will continue on 
    async register(req,res){
        const data = req.body
        // Encrypt password
        data.userPass =  await hash(data.userPass, 15)
        // payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        // Query
        const query = `
        INSERT INTO Users
        SET ?
        `
        db.query(query,[data],(err)=>{
            if(err) throw err
            res.cookies("LegitUser", token,
            {
                maxAge : 3600000,
                httpOnly : true
            })
            res.json({
                status: res.ststusCode,
                msg: " You are  now registered."
            })
        })
    }
    updateUser(req ,res) {
        const query = `
        UPDATE  Users SET ?
        WHERE userID = ?
        `
        db.query(query,
            [req.body, req.params.id],
            (err)=>{
                if(err) throw err
                res.json({
                    status:statusCode,
                    msg:"The user record was updated."
                })
            }
            )
    }
    deleteUser(req,res){
        const query = `
        DELETE FROM Users WHERE userID = ${req.params.id};
        `
        db.query(query ,(err)=>{
            if(err) throw err
            res.json({
                status:statusCode,
                msg: "A user record was deleted"
            })
        })
    }
}
module.exports = Users
// for exporting single object