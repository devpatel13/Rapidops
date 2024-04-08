const WebSocket = require("ws");
const handleRequest = require("./logic");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(request) {
    console.log("received: %s", request);
    let response;
    try {
      const parsedRequest = JSON.parse(request);
      console.log("parsed JSON:", parsedRequest);
      response = handleRequest(parsedRequest);
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      ws.send(
        JSON.stringify({
          message: "Invalid data",
          status: 500,
        })
      );
    }
  });
});
