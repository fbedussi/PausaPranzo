var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    hapi = require('hapi');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

var server = new hapi.Server();

server.connection({port:8080});

server.route({
    method : 'GET',
    path : '/{resourceName?}',
    handler : handle
});

server.start(function () {
    
    console.log('Server running at:', server.info.uri);
    
});

function handle(req, reply) {
    var root = './public';
    console.log(req.path);
    var uri = req.path;
    var filename = path.join(root, uri);
    var stats;

    function fileNotFound(err) {
        console.log('FILE NOT FOUND');
        reply('404 Not Found\n').type('text/plain').code(404);
        return;
    }

    function manageRequest(filePath){
        console.log('ManageRequest');
        console.log('fs.lstat->'+filePath);
        fs.lstat(filePath, function(err, stats){
            console.log('fs.lstat');
            console.log(err);
            console.log(stats);
            if (err) {
                console.log('fs.lstat-err->'+filePath);
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
            reply.file(filePath);
        } else if (stats.isDirectory()) {
            console.log('isDir');
            var fileNewName = path.join(filename,'index.html');

            //Se è una directory provo a fornire index.html come file di default da cercare e riparto
            manageRequest(fileNewName);
        } else {
            console.log('isBatman');
            reply('500 Internal server error').type('text/plain').status(500);

        }
    }

    //Inizia qui
    try {
        manageRequest(filename);

    } catch (err) {
        fileNotFound()
    }





}