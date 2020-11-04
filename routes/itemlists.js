const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router.route('/').get(async (req, res, next) => {
  try {
    const flower = new RegExp(req.query.flowers.replace(/,/g, '\\s|\\s'), 'i');
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

module.exports = router;
