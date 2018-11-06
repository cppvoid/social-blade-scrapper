/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */

var http = require('http');
var XLSX = require('xlsx');
var formidable = require('formidable');

var scrapper = require('./scrapper')

var html = "";
var PORT = 3000;

var extmap = {};

var server = http.createServer(function(req, res) {
	if(req.method !== 'POST') return res.end(html);
	var form = new formidable.IncomingForm();
	form.parse(req, async function(err, fields, files) {
		var f = files[Object.keys(files)[0]];
		
		// var wb = XLSX.readFile(f.path);

		var wb = await scrapper(f.path)

		// var ext = (fields.bookType || "xlsx").toLowerCase();
		res.setHeader('Content-Disposition', 'attachment; filename="download.' + 'xlsx' + '";');
		res.end(XLSX.write(wb, {type:"buffer", Props: wb.Props}));
	});
}).listen(PORT);

html = [
'<pre>',
'<h3>Play The Game Social Media Scrapper</h3>',
'<form method="POST" enctype="multipart/form-data" action="/">',
'<input type="file" id="file" name="file"/>',
'<input type="submit" value="scrape">',
'</form>',
'</pre>'
].join("\n");

console.log('listening on port ' + PORT);