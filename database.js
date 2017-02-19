var http = require('http');
var Pool = require('pg').Pool;
var random = Math.floor((Math.random() * 7));

// you can optionally supply other values
var config = {
  host: 'localhost',
  database: 'food_app',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config)

var server = http.createServer(function(req, res) {

  var onError = function(err) {
    console.log(err.message, err.stack)
    res.writeHead(500, {'content-type': 'text/plain'});
    res.end('An error occurred');
  };
});

pool
  .query('select * from restaurant_info')
  .then(function(result) {
    console.log(result.rows[random])
  });

  pool.end(function (err) {
    if (err) throw err;
  });
