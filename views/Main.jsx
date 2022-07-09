const React = require('react');
const Layout = require('./Layout');

function Main({ canvas }) {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <Layout>
      <h1>
        Paint <input type="color" id="color" defaultValue={randomColor} />
      </h1>

      <div className="canvas">
        {canvas.map((row, i) => (
          <div className="row" key={i}>
            {row.map((color, j) => (
              <button
                className="cell"
                style={{ backgroundColor: color }}
                key={j}
                data-row={i}
                data-col={j}
              />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
}

module.exports = Main;
