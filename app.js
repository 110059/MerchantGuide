/*
 load required modules
*/
var fs = require('fs');
var readLine = require('readline');
var Util = require(__dirname + '/dist/util-min');

/*
  read input data from txt file
*/
var Reader = readLine.createInterface({
	input : fs.createReadStream(__dirname + '/data/testInput.txt'),
	terminal : false
});

/*
read line by line and execute MerchantGuide
*/
Reader.on('line', function(line) {
	Util.MerchantGuide(line.trim());
});

/*
 print any uncaught exception
*/
process.on('uncaughtException', function(err) {
	console.log(err);
});
