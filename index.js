const canvas = document.getElementById('drawing-board'); //getting canvas document
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX; //determines size of canvas
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false; //drawing or not
let lineWidth = 1; //linewidth

let startX;
let startY;

/* clears canvas if clear button is clicked */
toolbar.addEventListener('click', e => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

// toolbar.addEventListener('change', e => {
//   if (e.target.id === 'stroke') {
//     ctx.strokeStyle = e.target.value; //if stroke color is changed, modify stroke as such
//   }

//   if (e.target.id === 'lineWidth') { //if line width is changed, modify linewidth as such
//     lineWidth = e.target.value;
//   }

// });

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener('mouseup', e => { //listen for when no longer drawing
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
