const express = require('express');
const Itemlist = require('../schemas/product');

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      console.log('haha');
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
        let cartcookie = req.cookies.cartcookie || [];
        cartcookie.push({_id:req.query.id,ea:req.query.ea});
        res.cookie('cartcookie', cartcookie, {
          maxAge: 6.048e+8
        });
        res.send(cartcookie);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
