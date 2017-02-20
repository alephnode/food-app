var express = require('express')
var app = express()

const RESTAURANT_COUNT = 7;
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
app.get('/', function (req, res) {
  var random = Math.floor((Math.random() * RESTAURANT_COUNT));
  pool
    .query('select * from restaurant_info')
    .then(function(result) {
      res.render('index', { message: result.rows[random].name })
    });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
