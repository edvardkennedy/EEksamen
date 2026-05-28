const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
let totaltSolgt = 0;

const server = http.createServer((req, res) => {
    // 1. Hvis noen ber om nettsiden, send HTML-filen
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
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
});
server.listen(PORT, () => {
    console.log(`Serveren kjører! Åpne http://localhost:3000 på din Raspberry Pi`);
});