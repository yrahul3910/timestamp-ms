"use strict";
const url = require('url');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});      
        let time = decodeURI(url.parse(req.url, true).pathname.substr(1));

        if (!isNaN(Number.parseInt(time))) {
            time = Number.parseInt(time) * 1000;
        }
        if (isNaN(Date.parse(time)) && isNaN(Number.parseInt(time)))
            res.end(JSON.stringify({unix: null, natural: null}));
        
        let date = new Date(time);

        const unix = date.valueOf();
        const natural = date.toDateString();        
        res.end(JSON.stringify({unix, natural}));
    }
});

server.listen(process.env.PORT);