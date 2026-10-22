
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://4ru1n.github.io");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");

    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.writeHead(204);
        return res.end();
    }

    if (req.method !== "GET") {
        res.writeHead(405);
        return res.end(JSON.stringify({
            error: "Method not allowed"
        }));
    }

    if (req.url === "/" || req.url === "/health") {
        res.writeHead(200);
        return res.end(JSON.stringify({
            status: "online",
            service: "Classroom Backend",
            message: "The server is running!"
        }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Endpoint not found"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Classroom backend listening on port ${PORT}`);
});
