import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.argv[2] || 8087);
const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.ico', 'image/x-icon']
]);

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function resolveRequest(url) {
  const cleanUrl = decodeURIComponent(url.split('?')[0]);
  const route = cleanUrl.endsWith('/') ? `${cleanUrl}index.html` : cleanUrl;
  const file = path.resolve(root, route.replace(/^\/+/, ''));
  if (!file.startsWith(root)) return null;
  return file;
}

const server = http.createServer((req, res) => {
  const file = resolveRequest(req.url || '/');
  if (!file) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      const notFound = path.join(root, '404.html');
      fs.readFile(notFound, (notFoundError, fallback) => {
        if (notFoundError) {
          send(res, 404, 'Not found');
          return;
        }
        send(res, 404, fallback, 'text/html; charset=utf-8');
      });
      return;
    }

    const type = mimeTypes.get(path.extname(file).toLowerCase()) || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Home Energy Scout dev server running at http://127.0.0.1:${port}/`);
});
