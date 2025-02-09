import * as http from 'node:http';

import { getLocalNetworkAddress } from './utils.js';

import router from './router/index.js';
import pool from './config/db.js';



const localAddress = getLocalNetworkAddress();

const PORT = 5000;
const HOST = localAddress || '127.0.0.1';



const server = http.createServer((req, res) => {

    router.route(req, res);
})

server.listen(PORT, HOST, () => {
    console.log(`Server is running at ${HOST}:${PORT}`);
})

