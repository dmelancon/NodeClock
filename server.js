var express = require('express');
var app = express();
var hbs = require('express-hbs');
var readline = require('readline');

app.listen(8000);								         
//console.log("Listening for new clients on port 8000");


// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express3({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

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
//app.get('/time', fetchTime);

var readline = require('readline'); // include the readline module
// var lineReader = readline.createInterface({
// input: process.stdin,
// output: process.stdout,
// terminal: false
// });
// lineReader.pause();
 
// create an interface to read lines from the Arduino:


var hour = 0;
var minute = 0;
var speed = 1;
var timezone = 0;


function fetchMinutes(request, response) {
  var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
    });
  console.log('x');
  lineReader.on('line', function (data) {
    minute = data;
    response.end("Minute: " + minute);
    lineReader.close();
  });
}

function fetchHours(request, response) {
  var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
    });
  console.log('q');
  lineReader.on('line', function (data) {
    hour = data;
    response.end("hour : " + hour);
    lineReader.close();
  });
}


function fetchSpeed(request, response) {
  var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
    });
  console.log('w');
  lineReader.on('line', function (data) {
    speed = data;
    response.end('Speed: '+ speed);
    lineReader.close();
  });
   
}

function fetchTimezone(request, response) {
  var lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
    });
  console.log('y');
  lineReader.on('line', function (data) {
    //console.log(data);
    timezone = data;
    response.end("Timezone: " + timezone);
    data = '';
    lineReader.close();
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
  console.log('t' + 0); 
  timezone = 0;
  console.log('s' + 1); 
  speed = 1;
  console.log('h' + 0); 
  console.log('h' + 0); 
  hour = 0;
  console.log('m' + 0);    
  minute = 0;
  response.render('home', {
      mHour : hour,
      mMinute  : minute,
      mSpeed : speed,
      mTimezone : timezone
    });
}


function sendIndexPage(request, response) {
    response.render('home', {
      mHour : hour,
      mMinute  : minute,
      mSpeed : speed,
      mTimezone : timezone
    });
}



