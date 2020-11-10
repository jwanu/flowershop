const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const HTTPS = require('https');

const connect = require('./schemas');
const indexRouter = require('./routes');
const itemlistsRouter = require('./routes/itemlists');
const cartRouter = require('./routes/carts');
const { SSL_OP_CRYPTOPRO_TLSEXT_BUG } = require('constants');
// const searchRouter = require('./routes/search');

const app = express();

app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
connect(); //스키마의 인덱스의 connect 함수 호출

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

// app.use('/search', searchRouter);
app.use('/teleflora/itemlists', itemlistsRouter);
app.use('/teleflora/carts', cartRouter);
app.use('/teleflora/', indexRouter);


app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터없음`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// try {
//     const option = {
//         ca: fs.readFileSync('/etc/letsencrypt/live/ec2-52-78-96-229.ap-northeast-2.compute.amazonaws.com/fullchain.pem'),
//         key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/ec2-52-78-96-229.ap-northeast-2.compute.amazonaws.com/privkey.pem'),'utf8').toString(),
//         cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/ec2-52-78-96-229.ap-northeast-2.compute.amazonaws.com/cert.pem'),'utf8').toString(),
//     };

//     HTTPS.createServer(option, app).listen(app.get('port'), ()=>{
//         console.log(`[HTTPS] Server is started on port ${app.get('port')}}`);
//     });
// } catch (err) {
//     console.error(`[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버가 실행되지 않습니다.`);
//     console.log(err);
// }

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '번 포트대기중');
})