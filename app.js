const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

const connect = require('./schemas');
const indexRouter = require('./routes');
const itemlistsRouter = require('./routes/itemlists');
const cartRouter = require('./routes/carts');
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

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '번 포트대기중');
})