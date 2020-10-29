const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.get(/\//, async (req, res, next) => {
    if(req.url === '/') req.url = '/index';
    let obj = {};
    try{
        if(req.url == '/itemlist'){
            obj = { itemlists : await Itemlist.find({}) };
        }
        console.log(obj);
        res.render(req.url.slice(1), obj);
    } catch (err) {
        next(err);
    }
})


module.exports = router;