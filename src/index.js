import express from 'express';
import os from 'os';
import indexRoutes from './routes/index.js';

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use('/', indexRoutes);

console.log('Starting server...');  
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

function getLocalIPs() {
  const nets = os.networkInterfaces();
  const results = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }
  return results;
}

const server = app.listen(PORT, HOST, () => {
  const addr = server.address();
  console.log(`Server is listening on ${addr.address}:${addr.port}`);
  const ips = getLocalIPs();
  if (ips.length) {
    console.log('IP Acceso:');
    ips.forEach(ip => console.log(`  http://${ip}:${addr.port}`));
  } else {
    console.log('No non-internal network interfaces found.');
  }
});


