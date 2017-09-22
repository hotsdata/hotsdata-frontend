const express = require('express');
const path = require('path');
const port = process.env.PORT || 3050;
const app = express();

// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

if (process.env.NODE_ENV !== 'production') {
  
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));

} else {
  app.use(express.static('dist'));
  
  app.route('*')
    .get((req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
} 

app.listen(port, () => console.log('Listening on port ${port}'));
