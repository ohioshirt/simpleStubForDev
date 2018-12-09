const http = require("http");
const stubApi = require('./stubJson');

http.createServer(handler).listen(8080, "127.0.0.1");

function handler(req, res) {
    const body = router(req, res);
    if (body) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(body);
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end("{}");
    }
}

function router(req, res) {
    const path = req.url;
    let response;

    if (stubApi.paths.find(i => i === path)) {
        response = stubApi.get(path);
    } else {
        // not executed
        res.writeHead(404, {'Content-Type': 'application/json'});
    }

    return response;
}
