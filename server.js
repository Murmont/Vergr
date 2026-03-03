const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8080;

const distPath = path.join(__dirname, 'dist');

// Debug: log what's in the directory so Cloud Logging shows it
console.log('VERGR starting...');
console.log('__dirname:', __dirname);
console.log('dist path:', distPath);
console.log('dist exists:', fs.existsSync(distPath));
if (fs.existsSync(distPath)) {
  console.log('dist contents:', fs.readdirSync(distPath));
} else {
  console.log('ROOT contents:', fs.readdirSync(__dirname));
}

app.use(express.static(distPath));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('index.html not found at ' + indexPath);
  }
});

// Explicitly bind to 0.0.0.0 — required for Cloud Run containers
app.listen(PORT, '0.0.0.0', () => {
  console.log('VERGR listening on 0.0.0.0:' + PORT);
});
