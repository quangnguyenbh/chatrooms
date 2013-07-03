var http = require('http') ;
var fs = require('fs') ;
var path = require('path') ;
var mine = require('mine') ;
var cache = {} ;

function send404(response) {
	response.writeHead(404, {'Content-Type' : 'text/plain'} );
	response.write('Error 404: resource not found.') ;
	response.end() ;
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
		200,{"content-type": mine.lookup(path.basename(filePath)) }
	);
	response.end(fileContents) ;
}

function serveStatic( response, cache, absPath) {
	if(cache[absPath]) {
		sendFile(response,absPath, cache[absPath]) ;
	}else {
		fs.exist(absPath,function(exists){
			if(exist) {
				fs.readFile(absPath,function(err, data){
					if (err) {
						send404(response) ;
					}else {
						cache[absPath] = data ;
						sendFile(response,absPath,data) ;
					}
				});
			}else{
				send404(response);
			}
		});	
	}
}
