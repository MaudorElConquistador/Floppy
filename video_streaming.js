// SOCKET SERVER TO USE WITH PYTHON
const net = require("net");
const server = net.createServer(socket => socket.on("data", buffer => io.emit("video stream", buffer.toString("utf-8"))));

server.on("error", err => {
    console.error(err);
    server.close();
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.listen({
    host: "127.0.0.1",
    port: 5050
});

// HTTP SERVER TO USE WITH BROWSER
const http = require("http");
const fs = require("fs");
const http_server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<!Doctype html><html><head></head><body><canvas></canvas><script type='text/javascript' src='/js/video_stream.js'></script><script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'></script></body></html>");
    } else if (req.url === "/js/video_stream.js") {
        const read_stream = fs.createReadStream("./public/javascripts/video_stream.js");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        read_stream.pipe(res);
    } else {
        res.writeHead(404);
        res.end("404");
    }

});

http_server.listen(8080, "127.0.0.1", () => console.log("http server listening on port 8080"));

// "SOCKETS" SERVER TO USE WITH JS BROWSER
const io = require("socket.io")(8888);