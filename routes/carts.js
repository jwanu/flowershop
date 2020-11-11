const express = require("express");
const Itemlist = require("../schemas/product");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      let cartcookie = req.cookies.cartcookie || [];
      cartcookie[+req.query.idx].ea = req.query.ea;
      res.cookie("cartcookie", cartcookie);
      res.redirect("/cart");
      // res.send(cartcookie);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  .post(async (req, res, next) => {
    try {
      let cartcookie = req.cookies.cartcookie || [];
      cartcookie.push({
        name: req.query.name,
        price: req.query.price,
        img: req.query.img,
        ea: req.query.ea,
      });
      res.cookie("cartcookie", cartcookie, {
        maxAge: 8.64e7,
      });
      console.log(cartcookie);
      res.send(cartcookie);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/delete", async (req, res, next) => {
  try {
    let cartcookie = req.cookies.cartcookie || [];
    cartcookie.splice(req.query.idx, 1);
    await res.cookie("cartcookie", cartcookie);
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/deleteAll", async (req, res, next) => {
  try {
    res.clearCookie("cartcookie");
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
