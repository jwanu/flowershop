const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

const connect = require('./schemas');
const indexRouter = require('./routes');
const itemlistsRouter = require('./routes/itemlists');
const cartRouter = require('./routes/carts');

const app = express();

app.set('port', process.env.PORT || 80);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/itemlists', itemlistsRouter);
app.use('/carts', cartRouter);
app.use('/', indexRouter);

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