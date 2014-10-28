var express = require('express');
var app = express();
var readline = require('readline');

app.listen(8000);								         
console.log("Listening for new clients on port 8000");
app.get('/', sendIndexPage);
app.get('/index*', sendIndexPage);
app.get('/minute/*', sendMinutes);
app.get('/hour/*', sendHours);
app.get('/timezone/*', sendTimezone);
app.get('/speed/*', sendSpeed);
app.get('/reset', sendReset);

app.get('/minute' , fetchMinutes);
app.get('/hour' , fetchHours);

var readline = require('readline'); // include the readline module

   
// create an interface to read lines from the Arduino:
var lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

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

function sendMinutes(request, response) {
  // the route is the first parameter of the URL request:
  var minute = request.params[0];  
  // send it out the console:
  console.log('m' + minute);     //should log 'm12'
  // send the data and close the connection:
  response.end(minute);
}

function sendHours(request, response) {
  // the route is the first parameter of the URL request:
  var hour = request.params[0];  
  // send it out the console:
  console.log('h' + hour);      //should log 'h12'
  // send the data and close the connection:
  response.end(hour);
}

function sendTimezone(request, response) {
  // the route is the first parameter of the URL request:
  var timezone = request.params[0];  
  // send it out the console:
  console.log('t' + timezone);      //should log 'h/12'
  // send the data and close the connection:
  response.end(timezone);
}

function sendSpeed(request, response) {
  // the route is the first parameter of the URL request:
  var speed = request.params[0];  
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
  // response.write("hours: " + 0);
  // response.write("minutes: " + 0); 
  // response.write("speed: " + 0); 
  // response.write("timeZone: " + 0); 
  // // send the data and close the connection:
  // response.end();
}


function sendIndexPage(request, response) {
  response.sendfile(__dirname + '/index.html');
}



