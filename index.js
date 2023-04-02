// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req,res) => {
  const d = Date.now();
  const date = new Date(d);
  res.json({unix: d, utc: date.toUTCString()})
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let d = req.params.date;
  if (!d.includes('-')) {
    d = parseInt(d);
  }
  try {
    const date = new Date(d);
    const unixDate = date.getTime();
    date = date.toUTCString();
    res.json({ unix: unixDate, utc: date });
  } catch (error) {
    res.json({error: "Invalid Date"})
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
