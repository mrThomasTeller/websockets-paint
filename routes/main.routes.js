const ReactDOMServer = require('react-dom/server');
const React = require('react');
const mainRouter = require('express').Router();

const Main = require('../views/Main');

mainRouter.get('/', (req, res) => {
  const element = React.createElement(Main);
  const html = ReactDOMServer.renderToStaticMarkup(element);
  res.write('<!DOCTYPE html>');
  res.end(html);
});

module.exports = mainRouter;
