import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import api from './app.js';

const server = http.createServer(api);

server.listen(8088, () => {
    console.log('connected on port 8088');
});
