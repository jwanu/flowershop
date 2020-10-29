const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
    try{
        console.log('왔냐?');
        const itemlists = await Itemlist.find({});
        //console.log(itemlists);
        // res.json(itemlists);
        res.render('itemlist', { itemlists });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

//이건 조건별 아이템리스트 불러올때로 수정해서 쓸 수 있을듯?
// router.get('/:id/comments', async(req, res, next) => {
//     try {
//         const comments = await Comment.find({ commenter: req.params.id })
//         .populate('commenter');
//         console.log(comments);
//         res.json(comments);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

module.exports = router;