// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api/timestamp/', (req, res) => {
	const currentDate = new Date();

	res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

app.get('/api/timestamp/:date_string', (req, res) => {
	let setDate;
	const inputDate = req.params.date_string;

	if (inputDate.includes('-')) {
		setDate = new Date(inputDate);
	} else {
		setDate = new Date(parseInt(inputDate, 10));
	}

	const unix = setDate.getTime();
	const utc = setDate.toUTCString();

	if (utc === 'Invalid Date') {
		res.json({ error: utc });
	} else {
		res.json({ unix, utc });
	}
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.

// If the date string is **valid** the api returns a JSON having the structure 
// `{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
// e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.

// If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.