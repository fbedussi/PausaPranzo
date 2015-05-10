var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

http.createServer(handler).listen(8080);

console.log('in ascolto su porta 8080');

function handler(req, res) {
    var root = './public';
    console.log(req.url);
    var uri = req.url;
    var filename = path.join(root, uri);
    var stats;

    function fileNotFound(err) {
        console.log('FILE NOT FOUND');
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end(err);
        return;
    }

    function manageRequest(filePath){
        console.log('ManageRequest');
        console.log(filePath);
        fs.lstat(filePath, function(err, stats){
            console.log('fs.lstat');
            console.log(err);
            console.log(stats);
            if (err) {
                console.log('fs.lstat-err');
                return fileNotFound();
            }
            return  manageFileResponse(stats,filePath);
        });
    }

    function manageFileResponse(stats,filePath) {
        console.log('manageFileResponse');
        var stats = stats;
        if (stats.isFile()) {
            console.log('isFile');
            console.log(filePath);
            //controllo il mimeType che ho mappato precedentemente
            console.log(path.extname(filePath));
            console.log(path.extname(filePath).split("."));
            console.log(path.extname(filePath).split(".").reverse());
            console.log(path.extname(filePath).split(".").reverse()[0]);

            var mimeType = mimeTypes[path.extname(filePath).split(".").reverse()[0]];
            res.writeHead(200, {'Content-Type': mimeType} );
            console.log(filePath);
            var fileStream = fs.createReadStream(filePath);
            console.log(res);
            fileStream.pipe(res);
        } else if (stats.isDirectory()) {
            console.log('isDir');
            var fileNewName = path.join(filename,'index.html');

            //Se è una directory provo a fornire index.html come file di default da cercare e riparto
            manageRequest(fileNewName);
        } else {
            console.log('isBatman');
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('500 Internal server error');
        }
    }

    //Inizia qui
    try {
        manageRequest(filename);

    } catch (err) {
        fileNotFound()
    }





}