const express = require('express');

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
        const itemid = req.query.id;
        if(req.cookies.cart) {
            const cart = req.cookies.cart;
        }else{
            const cart = {};
        }
        // if(!cart[id]){
        //     cart[id] = 0;
        // }
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
