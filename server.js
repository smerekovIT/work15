/*var fs = require('fs');
var file = fs.createWriteStream('demo.txt');
for(var i = 0; i<=100000; i++) {
	file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.			t enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

};
file.end();*/

var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
var stats = fs.statSync('demo.txt');
var fileSize = stats['size'];
var stream = fs.createReadStream('demo.txt');

	if(req.url == '/stream') {
		stream.pipe(res);
	} else if(req.url == '/file') {
		fs.readFile('demo.txt', function(err, data) {
				res.write(data);
				res.end();
		})
	} else if (fileSize < 4440444 ) {
		fs.readFile('demo.txt', function(err, data) {
				res.write(data);
				res.end();
		})
			
	} else {
		
		stream.pipe(res);
	}


}).listen(3000, ()=>{console.log('On localhost')})
