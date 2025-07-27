import { WebSocketServer } from "ws";
import { handleSocketMessage } from "./ws.controller.js";

export const initializeWebSocket = (server) => {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    ws.on("message", async (raw) => {
      try {
        const message = JSON.parse(raw.toString());
        const response = await handleSocketMessage(message);

        const result = JSON.stringify({ status: "success", data: response });
        ws.send(result);
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(result);
          }
        });
      } catch (err) {
        ws.send(JSON.stringify({ status: "error", error: err.message }));
      }
    });
  });
};
