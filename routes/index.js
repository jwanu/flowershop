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
            if(cartcookie){
                const idarr = cartcookie.map(v => {
                    this._id = v._id;
                })
                console.log(idarr);
                obj = { cartcookie, cartitems : await Itemlist.find({$or:[{_id:'5f9a8014403dec9978ba83a9'},{_id:'5f9bbec43413d786fd8f807f'}]})};
                //장바구니에 물건있을경우 표시시키기
            }
            //장바구니비었으면 그림 넣기~
        }
        if(req.url == '/itemlist'){
            obj = { itemlists : await Itemlist.find({}) };
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