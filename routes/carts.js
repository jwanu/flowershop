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
      cartcookie.push({ name: req.query.name, price: req.query.price, img: req.query.img, ea: req.query.ea });
      res.cookie('cartcookie', cartcookie, {
        maxAge: 8.64e+7,
      });
      console.log(cartcookie);
      res.send(cartcookie);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
