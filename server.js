const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/hoteis.html') {
        fs.readFile(path.join(__dirname, 'hoteis.html'), (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro no servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Página não encontrada');
    }
});

server.listen(8000, () => {
    console.log('Servidor rodando em http://localhost:8000');
});
