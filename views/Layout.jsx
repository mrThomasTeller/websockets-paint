const React = require('react');

function Layout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <title>Paint</title>
        <link rel="stylesheet" type="text/css" href="/style.css" />
        <script defer src="/script.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}

module.exports = Layout;
