const socketClient = new WebSocket(window.location.origin.replace(/^http/, 'ws'));

const colorInput = document.getElementById('color');

let userColor = colorInput.value;
document.getElementById('color').addEventListener('change', () => {
  userColor = colorInput.value;
});

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', () => {
    const row = Number(cell.getAttribute('data-row'));
    const col = Number(cell.getAttribute('data-col'));
    cell.style.backgroundColor = userColor;
    socketClient.send(JSON.stringify({ row, col, color: userColor }));
  });
});

socketClient.onmessage = (message) => {
  const { row, col, color } = JSON.parse(message.data);
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cell.style.backgroundColor = color;
};
