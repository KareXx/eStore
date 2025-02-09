import url from 'url'

import http from 'http';
import fs from 'fs';
import path from 'path';
import { staticHandler } from './staticHandler.js';

// const mimeTypes = {
//     '.html': 'text/html',
//     '.css': 'text/css',
//     '.js': 'application/javascript',
//     '.png': 'image/png',
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg',
//     '.gif': 'image/gif',
//     '.svg': 'image/svg+xml',
//     '.webp': 'image/webp'

// };

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const parentDir = path.join(__dirname, '..');
// const staticDir = path.join(parentDir, 'static');


const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.3:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, TRACE, CONNECT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Если нужны куки/авторизация
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src *;");
}


class Router{
    constructor(){
        this.client;
        this.getRoutes = {};
        this.postRoutes = {};
        this.patchRoutes = {};
        this.deleteRoutes = {};
        this.matching = [];
    }

    processWildcardRoutes() {
        for (const key in this.getRoutes){
            if(key.includes('*')){
                const rx = new RegExp(key.replace('*', '(.*)'));
                const route = this.getRoutes[key];
                this.matching.push([rx, route]);
                delete this.getRoutes[key]
            }
        }
    }

    get(path, func){
        if(!this.getRoutes[path]){
            this.getRoutes[path] = func;
            this.processWildcardRoutes();
        }
    }

    post(path, func){
        if(!this.postRoutes[path]){
            this.postRoutes[path] = func
        }
    }

    delete(path, func){
        if(!this.deleteRoutes[path]){
            this.deleteRoutes[path] = func
        }
    }

    patch(path, func){
        if(!this.patchRoutes[path]){
            this.patchRoutes[path] = func
        }
    }

    route(req, res){
        const method = req.method;
        const urlPath = url.parse(req.url).pathname;
        

        setCorsHeaders(res)

        switch (method){
            case 'OPTIONS':
                
                res.writeHead(204); // Нет содержимого
                res.end();
                return;


            case 'GET':
                let par;
                let route = this.getRoutes[urlPath];
                const isStaticHandle = staticHandler(req, res, urlPath)

                if(isStaticHandle) break 
                if(!route){
                    for (let i = 0; i < this.matching.length; i++){
                        const rx = this.matching[i];
                        par = urlPath.match(rx[0]);

                        if(par){
                            par.shift();
                            route = rx[1];
                            break;
                        }
                    }
                }
                if(!route){
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not found')
                }
                return route(req, res, par);

            case 'POST':
                if(this.postRoutes[urlPath]){
                    return this.postRoutes[urlPath](req, res);
                }else{
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not found')
                }
                break;


            case 'DELETE':
                if(this.deleteRoutes[urlPath]){
                    return this.deleteRoutes[urlPath](req, res);
                }else{
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not found')
                }
                break;
            
            case 'PATCH':
                if(this.patchRoutes[urlPath]){
                    return this.patchRoutes[urlPath](req, res);
                }else{
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not found')
                }
                break;

            default:
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                return res.end(`Method ${method} not allowed`);
        }
    }
}

export default Router