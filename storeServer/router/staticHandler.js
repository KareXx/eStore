import url from 'url'

import fs from 'fs';
import path from 'path';

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'

};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.join(__dirname, '..');
const staticDir = path.join(parentDir, 'static');


export const staticHandler = (req, res, urlPath) => {
    const extname = path.extname(urlPath).toLowerCase();
    
    if(mimeTypes[extname]){
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        const filePath = path.join(staticDir, urlPath);
        
        fs.exists(filePath, (exists) => {
            if (!exists) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
    
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal server error');
                    return;
                }
    
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
                
            });
        });

        return true
    }
    return false
}