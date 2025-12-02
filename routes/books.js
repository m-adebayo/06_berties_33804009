// Create a new router
const express = require("express")
const router = express.Router()
const redirectLogin = (req,res,next) => req.app.locals.redirectLogin(req,res,next);
const {check, validationResult} = require('express-validator');

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});


router.get('/search-result', function (req, res, next) {
    let keyword = req.sanitize(req.query.keyword);
    let sqlquery = "SELECT * FROM books WHERE name LIKE ?";
    let searchTerm = '%' + keyword + '%'; // matches any book containing the keyword
    
    db.query(sqlquery, [searchTerm], (err, result) => {
        if (err) return next(err);
        res.render("search-result.ejs", { searchResults: result, keyword: keyword });
    });
});


    router.get('/list', redirectLogin, function(req, res, next) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
res.render("list.ejs", {availableBooks:result})         });
    });

router.get('/addbook', redirectLogin, function(req, res, next){
    res.render('addbook.ejs');
});

router.post('/bookadded',
    [
    check('name').notEmpty(),
    check('price').notEmpty(),
    check('author').notEmpty()
],

 function (req, res, next) {
            const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('./register')
    }
    else{

    // saving data in database
    let sqlquery = "INSERT INTO books (name, price,author) VALUES (?,?,?)"
    // execute sql query
    let newrecord = [req.sanitize(req.body.name), req.sanitize(req.body.price), req.sanitize(req.body.author)]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(req.body.name +' by '+ req.body.author +' has been added to the booklist. It costs '+ req.body.price)
    })
}})

// List all books priced less than £20
router.get('/bargainbooks', function(req, res, next) {
    let sqlquery = "SELECT name, price FROM books WHERE price < 20";
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("bargainbooks.ejs", { bargainBooks: result });
        }
    });
});


// Export the router object so index.js can access it
module.exports = router
