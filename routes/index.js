const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.get(/\//, async (req, res, next) => {
    if(req.url === '/') req.url = '/index';
    let obj = {};
    try{
        //아이템리스트 페이지 처음 들어갈 때 아이템리스트 로딩하는것.
        if(req.url == '/cart'){
            let cartcookie = req.cookies.cartcookie || [];
            if(cartcookie && cartcookie.length > 0 ){
                obj = { cartcookie };
            }
        }
        if(req.url == '/itemlist'){
            obj = { itemlists : await Itemlist.find({}) };
        }
        if(req.url.includes('itemlist/')){
            const cat = req.url.split('/')[2];
            obj = { itemlists : await Itemlist.find({ category: cat }), cat };
            req.url = '/itemlist';
        }
        if(req.url.includes('iteminfo')){
            const itemId = req.url.split('/')[2];
            obj = { item : (await Itemlist.find({ _id: itemId }))[0]};
            req.url = '/iteminfo';
        }
        res.render(req.url.slice(1), obj);
    } catch (err) {
        next(err);
    }
})

//페이지 처음 들어갈때 로딩되는 부분은 여기에서만 작성해도 됨!

module.exports = router;