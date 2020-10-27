const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

// router.get('/', async (req, res, next) => {
//     try{
//         const users = await User.find({});
//         console.log('이건', req.url);
//         res.render('index', { users });
        
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

// router.get('/search', async (req, res, next) => {
//     console.log('이건', req.url);
//     if(req.url === '/') req.url = '/index';
//     try{
//         res.render(req.url.slice(1));
//     } catch (err) {
//         next(err);
//     }
// });

// router.get('/cart', async (req, res, next) => {
//     console.log('이건', req.url);
//     if(req.url === '/') req.url = '/index';
//     try{
//         res.render(req.url.slice(1));
//     } catch (err) {
//         next(err);
//     }
// });


router.get(/\//, async (req, res, next) => {
    if(req.url === '/') req.url = '/index';
    try{
        res.render(req.url.slice(1));
    } catch (err) {
        next(err);
    }
})

module.exports = router;