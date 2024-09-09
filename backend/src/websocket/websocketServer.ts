import WebSocket from 'ws';
import { addTaskToCache } from '../services/redisService';

export const setupWebSocketServer = (wss: WebSocket.Server) => {
    wss.on('connection', (ws) => {
        ws.on('message', async (message: string) => {
            const data = JSON.parse(message.toString());
            if (data.event === 'add') {
                await addTaskToCache(data.task);
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ event: 'update', task: data.task }));
                    }
                });
            }
        });
    });
};
