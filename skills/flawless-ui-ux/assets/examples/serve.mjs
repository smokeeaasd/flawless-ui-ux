// Optional dependency-free preview. Binds only to this computer.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve, relative, extname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.argv[2] ?? 4178);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Choose a port from 1024 to 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const target = resolve(root, `.${path === '/' ? '/index.html' : path}`);
    const inside = relative(root, target);
    if (inside.startsWith('..') || isAbsolute(inside)) { res.writeHead(403).end(); return; }
    const content = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Examples: http://127.0.0.1:${port}`));
