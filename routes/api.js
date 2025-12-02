const express = require('express');
const router = express.Router();

router.get('/books', (req, res, next) => {
    let search = req.query.search;
    let minPrice = req.query.minprice;
    let maxPrice = req.query.maxprice;

    let sqlquery = "SELECT * FROM books";
    let conditions = [];
    let params = [];
   
    if (search) {
        conditions.push("name LIKE ?");
        params.push(`%${search}%`);
    }


    if (minPrice) {
        conditions.push("price >= ?");
        params.push(minPrice);
    }

    if (maxPrice) {
        conditions.push("price <= ?");
        params.push(maxPrice);
    }

    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json({ error: err });
            return next(err);
        }
        res.json(result);
    });
});

module.exports = router;
