// не забудь установить babel:
// npm i @babel/core @babel/preset - env @babel/preset-react @babel/register
// также не забудь положить файл .babelrc в корень проекта
require('@babel/register');
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const createSocketServer = require('./socket');
const expressConfig = require('./config/express');
const Main = require('./views/Main');

const app = express();

// функция настройки экспресса
expressConfig(app);

app.get('/', (req, res) => {
  const element = React.createElement(Main, { canvas: app.locals.canvas });
  const html = ReactDOMServer.renderToStaticMarkup(element);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

app.listen(3000, () => console.log('server started at 3000'));

createSocketServer(app);
