import express from 'express';
const app = express();

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const indexPath = path.join(__dirname, '/src');
const publicPath = express.static(path.join(__dirname, './dist'));

app.use('/dist', publicPath);
app.get('*', (_, res) => {
  res.sendFile(indexPath);
});

app.listen(port);
console.log("SERVER STARTED on PORT ", port);
