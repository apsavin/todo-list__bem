var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    PRIV = require('./todo-list.node.js').PRIV,
    BEMHTML = require('./_todo-list.bemhtml.js').BEMHTML,
    DATA = require('./../../data/data').data;

http.createServer(function (req, res) {

    var urlParsed = url.parse(req.url, true);
    if (urlParsed.path === '/') {
        res.writeHeader(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.write(BEMHTML.apply(PRIV(DATA)));
        res.end();
    } else {
        res.write(fs.readFileSync(path.join(__dirname, urlParsed.path).toString(), 'utf-8'));
        res.end();
    }

}).listen(8080);