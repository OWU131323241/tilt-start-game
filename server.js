// server.js
const express = require('express');
const path = require('path');
const app = express();

// static フォルダ（例: build や public）を正しく指定する
// React の場合: const staticDir = path.join(__dirname, 'build');
// SPA ビルド出力先に合わせて変更してください
const staticDir = path.join(__dirname, 'build');

app.use(express.static(staticDir));

// SPA の場合、全ての未マッチに index.html を返す
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'), err => {
    if (err) {
      console.error('sendFile error:', err);
      res.status(500).send('Server error');
    }
  });
});

// Render が割り当てるポートを使う。0.0.0.0 でバインドしておくと確実。
const port = process.env.PORT || 10000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
