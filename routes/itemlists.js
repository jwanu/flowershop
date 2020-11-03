const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    console.log(req.query);
    const flower = new RegExp(req.query.flowers.replace(/,/g, '\\s|\\s'), 'i');
    console.log(req.query.flowers.replace(/,/g, '\\s|\\s'));
    console.log(flower);
    const color = new RegExp(req.query.colors.replace(/,/g, '|'), 'i');
    const priceRange = req.query.priceRange ? req.query.priceRange
      .split(',')
      .map((a) => a.split('~'))
      .map((b) => {
        const price = {};
        if (b[0]) price.$gte = b[0];
        if (b[1]) price.$lte = b[1];
        return { price };
      }) : '';

    const condition = [
        { desc: flower },
        { desc: color },
    ];
    
    priceRange && priceRange.length > 0 ? condition.push({$or: priceRange}) : 0;
    const items = await Itemlist.find({ $and: condition });
    res.json(items);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// find({$or: [{price:{$lte: 40}},{price:{$lte: 40}}]})
//이건 조건별 아이템리스트 불러올때로 수정해서 쓸 수 있을듯?
router.get('/:flowers/:colors', async (req, res, next) => {
  console.log('오나?');
  // try {
  //     console.log(req.params);
  //     const flower = new RegExp(req.params.flowers.replace(',','|'),'i');
  //     const items = await Itemlist.find({ $and: [{desc: flower}, {desc : /purple/i}] });
  //     res.json(items);
  // } catch (err) {
  //     console.error(err);
  //     next(err);
  // }
});

module.exports = router;
