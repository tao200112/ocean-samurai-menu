import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Received payload length:', body.length);
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync('toast_menu_raw.json', JSON.stringify(parsed, null, 2));
        console.log('Saved to toast_menu_raw.json successfully!');
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok' }));
        setTimeout(() => process.exit(0), 1000);
      } catch (err) {
        console.error('Error parsing JSON:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.toString() }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Listening on http://localhost:3001');
});
