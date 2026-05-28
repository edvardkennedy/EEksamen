const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
let totaltSolgt = 0;

const server = http.createServer((req, res) => {
    // 1. Send til nettside index
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Feil: Kunne ikke laste index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } 
    // 2. Hvis noen trykker på "Kjøp", Print terminal
    else if (req.method === 'POST' && req.url === '/nytt-kjop') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            totaltSolgt++;
            
            // Terminal Logg for Jonas
            console.clear(); 
            console.log(" ALERT: JONAS HAR FÅTT EN BESTILLING! ");
            console.log(`[VARSLING] Produkt: ${data.sverd}`);
            console.log(`[STATUS]   Totalt solgt i dag: ${totaltSolgt} stk`);
            
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Mottatt');
        });
    }
    // 3. AUTOMATISK FILSERVER (Henter styles.css, script.js og bilder fra kilder-mappen)
    else if (req.method === 'GET') {
        const filePath = path.join(__dirname, req.url);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404: Filen ble ikke funnet');
            }
            
            // Setter riktig Content-Type basert på filtype så nettleseren forstår det
            let contentType = 'text/plain';
            if (filePath.endsWith('.css')) contentType = 'text/css';
            if (filePath.endsWith('.js')) contentType = 'application/javascript';
            if (filePath.endsWith('.webp')) contentType = 'image/webp';
            if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
});

server.listen(PORT, () => {
    console.log(`Serveren kjører! Åpne http://localhost:3000`);
});