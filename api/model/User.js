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
        const {emailAdd, userPass} = 
        req.body
        // query
        const query = `
        SELECT firstName , lastName , gender ,userDOB,
        emailAdd ,underPass, profileUrl
        FROM Users
        WHERE emailAdd = ${emailAdd}
        `
        db.query(query, async(err,results)=>{
            if(err) throw err
            if(!results?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })

            }else{
                await compare(userPass,results[0].userPass,(cErr,cResults)=>{
                    if(cErr) throw cErr
                    // Create a token
                    const token = createToken({
                        emailAdd,userPass
                    })
                    // Save a token 
                    res.cookies("LegitUser",
                    token,{
                        maxAge: 3600000,
                        httpOnly: true
                    }
                    )
                    if(cResults){
                        res.json({
                            msg: "Logged in",
                            token,
                            results: results[0]
                        })
                    }else{
                        res.json({
                            status:statusCode,
                            msg: "Invaild password or you have not registered"
                        })
                    }
                })

            }
        })
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