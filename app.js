// First we require the express package that was just installed.
const express = require('express');

const bodyParser = require('body-parser');

// Then, we create an instance named app by invoking Express.
const app = express();

let request = require('request');

const config = require('./config.js');
let apiKey = config.key;

// allows us to access all of the static files within the ‘css’ folder.
app.use(express.static('css'));

app.use(bodyParser.urlencoded({ extended: true }));

// set up our template engine
app.set('view engine', 'ejs')

// Here, we are specifically focusing on the root URL (/). 
// If we visit the root URL, Express will respond with “Hello World!”.
app.get('/', function (req, res) {
  // res.send('Hello World!')
  // res.render('index');
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  // console.log(req.body.city);
  // res.render('index');  
  request(url, function (err, response, body) {
    if(err) {
      res.render('index', {weather: null, error: 'Error, please try again'});
    } 
    else {
      let weather = JSON.parse(body)
      if(weather.main === undefined) {
        res.render('index', {weather: null, error: 'Error, please try again'});
      }
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

// Here, we are creating a server that is listening on port 3000 for connections.
app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
