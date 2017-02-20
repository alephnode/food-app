var express = require('express')
var app = express()

const RESTAURANT_COUNT = 7;
const HOME_COUNT = 3;
var Pool = require('pg').Pool;


// you can optionally supply other values
const CONFIG = {
  host: 'localhost',
  database: 'food_app',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})

var pool = new Pool(CONFIG)

app.set('view engine', 'pug')

.get('/', function(req, res){
  res.render('index')
})

.get('/grab-something', function (req, res) {
  var random = Math.floor((Math.random() * RESTAURANT_COUNT));
  pool
    .query('select * from restaurant_info')
    .then(function(result) {
      var name = result.rows[random].name;
      var address = result.rows[random].address;
      var phone = result.rows[random].phone;
      var hours = result.rows[random].hours;

      res.render('app-grab', { name: name, address: address, phone: phone, hours: hours })
    });
})
.get('/make-something', function (req, res) {
  var random = Math.floor((Math.random() * HOME_COUNT));
  pool
    .query('select * from home_dinners')
    .then(function(result) {
      var name = result.rows[random].name;

      res.render('app-make', { name: name })
    });
})

.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
