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
  let flag = true;
  for (i=0;i<d.length;i++) {
    if (d[i] >= '0' && d[i] <='9') {
      continue;
    } else {
      flag = false;
      break;
    }
  }
  let final_d = d;
  if (flag === true) {
    final_d = parseInt(d);
  }
  let date = new Date(final_d);
  const unixDate = date.getTime();
  date = date.toUTCString();
  if (date == "Invalid Date") {
    res.json({error: date});
    return;
  }
  res.json({ unix: unixDate, utc: date });
  res.json({error: "Invalid Date"})
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
