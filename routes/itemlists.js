const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
    try{
        const items = await Itemlist.find({});
        res.json(items);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

//이건 조건별 아이템리스트 불러올때로 수정해서 쓸 수 있을듯?
router.get(`/:cond`, async(req, res, next) => {
    try {
        const items = await Itemlist.find({ 'desc': `/${req.params.condition}/i` });
        res.json(items);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;