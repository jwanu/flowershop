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
      // cartcookie = cartcookie.map((c) => {
      //   if (c._id == req.query.id) {
      //     c.ea += req.query.ea;
      //   } else {
      cartcookie.push({ _id: req.query.id, ea: req.query.ea });
      //   }
      // });
      res.cookie('cartcookie', cartcookie, {
        maxAge: 6.048e8,
      });
      console.log(cartcookie);
      res.send(cartcookie);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
