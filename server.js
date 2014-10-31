var express = require('express');
var app = express();
var expressHandlebars = require('express3-handlebars');
var readline = require('readline');

app.listen(8000);								         
//console.log("Listening for new clients on port 8000");
app.engine('handlebars', expressHandlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.get('/', sendIndexPage);
app.get('/index*', sendIndexPage);
app.get('/minute/*', sendMinutes);
app.get('/hour/*', sendHours);
app.get('/timezone/*', sendTimezone);
app.get('/speed/*', sendSpeed);
app.get('/reset', sendReset);

app.get('/minute' , fetchMinutes);
app.get('/hour' , fetchHours);
app.get('/speed' , fetchSpeed);
app.get('/timezone' , fetchTimezone);


var readline = require('readline'); // include the readline module

   
// create an interface to read lines from the Arduino:
var lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var hour = 4;
var minute = 4;
var speed = 4;
var timezone = 4;


function fetchMinutes(request, response) {
  console.log('x');
  lineReader.on('line', function (data) {
    console.log(data);
    response.end(data);
  });
}

function fetchHours(request, response) {
  console.log('q');
  lineReader.on('line', function (data) {
    console.log(data);
    response.end(data);
  });
}

function fetchSpeed(request, response) {
  console.log('w');
  lineReader.on('line', function (data) {
    console.log(data);
    response.end(data);
  });
}

function fetchTimezone(request, response) {
  console.log('y');
  lineReader.on('line', function (data) {
    console.log(data);
    response.end(data);
  });
}



function sendMinutes(request, response) {
  // the route is the first parameter of the URL request:
  minute = request.params[0];  
  // send it out the console:
  console.log('m' + minute);     //should log 'm12'
  // send the data and close the connection:
  response.end(minute);
}

function sendHours(request, response) {
  // the route is the first parameter of the URL request:
  hour = request.params[0];  
  // send it out the console:
  console.log('h' + hour);      //should log 'h12'
  // send the data and close the connection:
  response.end(hour);
}

function sendTimezone(request, response) {
  // the route is the first parameter of the URL request:
  timezone = request.params[0];  
  // send it out the console:
  console.log('t' + timezone);      //should log 'h/12'
  // send the data and close the connection:
  response.end(timezone);
}

function sendSpeed(request, response) {
  // the route is the first parameter of the URL request:
  speed = request.params[0];  
  // send it out the console:
  console.log('s' + speed);      //should log 'h/12'
  // send the data and close the connection:
  response.end(speed);
}

function sendReset(request, response) {
  // send it out the console:
  console.log('h' + 0); 
  console.log('m' + 0);    
  console.log('t' + 0); 
  console.log('s' + 1); 
  response.sendfile(__dirname + '/index.html');
  response.end();
}


function sendIndexPage(request, response) {
    response.render('home', {
      hour : hour,
      minute  : minute,
      speed : speed,
      timezone : timezone
    });

    
  //response.sendfile(__dirname + '/index.html');
}



