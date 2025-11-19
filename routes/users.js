// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM users"; // query database to get all the users
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
res.render("userlist.ejs", {users:result})         });
});

router.get('/login', function (req,res,next){
    res.render('login.ejs')
})

router.get('/audit', function(req, res, next) {
    const sqlquery = "SELECT * FROM audit_log ORDER BY timestamp DESC";
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('audit.ejs', { audit: result });
    });
});


router.post('/registered', function (req, res, next) {
    const username = req.body.username;
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const plainPassword = req.body.password

    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){
    if (err){
        return next (err)
    }

    let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?,?,?,?,?)";

    let newrecord = [username, first, last, email, hashedPassword];
     

    db.query(sqlquery, newrecord,(err,result) =>{
        if(err) {
            return next(err);
        }
  
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email + 'Your password is: '+ req.body.password +' and your hashed password is ' + hashedPassword);                                                       
         });                        
    }); 
});

router.post('/loggedin', function (req,res,next){
    const username = req.body.username;
    let sqlquery = "SELECT hashedPassword FROM users where username = ?"

    db.query(sqlquery, [username], (err,result) => {
        if (err){
            return next(err);
        }
        
        if (result.length === 0){
            const auditFail = "INSERT INTO audit_log (username,status) VALUES (?,?)";
            db.query(auditFail, [username,'failure']);
            return res.send("Login failed: Username not found.");
        }

        const hashedPassword = result[0].hashedPassword;
            bcrypt.compare(req.body.password, hashedPassword, function(err, same) {
                if (err) {
                    return next(err);
                }
        if (same === true) {
            const auditSuccess = "INSERT INTO audit_log (username,status) VALUES (?,?)";
            db.query(auditSuccess, [username, 'success'])
            res.send("You have logged in, Welcome back, " + username);
      }
      else {
        const auditFail = "INSERT INTO audit_log (username,status) VALUES (?,?)";
        db.query(auditFail, [username,'failure']);
        res.send("Login failed: Incorrect Password")
      }
    })

    })
});
// Export the router object so index.js can access it
module.exports = router
