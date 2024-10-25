// index.js
// where your node app starts

// init project
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Date api
app.get("/api/:date", (req, res) => {
  let input = req.params.date
  console.log(input);
  // check if number
  if(!isNaN(Number(input))) {
    return res.json ({ 
      unix: parseInt(input),
      utc: new Date(Number(input)).toUTCString() 
    })
  } else {
    let dateFormat = new Date(input);
    console.log(dateFormat)
    
    if(dateFormat.toUTCString() === "Invalid Date") {
      res.json({
        error : "Invalid Date"
      });
    } else {
    res.json({
    unix: dateFormat.getTime(),
    utc: dateFormat.toUTCString()
      });
    }
    
  }
  
  
});

// If No date entered
app.get("/api", (req, res) => {
  res.json({ 
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
   });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
