const localtunnel = require('localtunnel');
const http = require('http');

(async () => {
  try {
    const tunnel = await localtunnel({ port: 3000 });
    console.log('\n==================================================');
    console.log('>>> PUBLIC SHAREABLE URL: ' + tunnel.url + ' <<<');
    console.log('==================================================\n');

    // Get public IP for localtunnel friendly reminder
    http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => {
        console.log('Note: Localtunnel password / tunnel IP (if prompted by loca.lt): ' + data.trim());
      });
    }).on('error', () => {});

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Failed to create tunnel:', err);
  }
})();
