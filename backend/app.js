var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Inicialize o app antes de usar
var app = express();

// Importação das rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticationRouter = require('./routes/authentication'); 

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/authentication', authenticationRouter);  

// Middleware de erro padrão
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;