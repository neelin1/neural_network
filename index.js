/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const clearButton = document.getElementById("clearButton");
const ctx = canvas.getContext("2d");

//drawing or not
let isPainting = false;

//Set how many squares our on each side of the canvas
const CELL_SIDE_COUNT = 28;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {};

// Set default color
colorInput.value = "#000000";

// Initialize the canvas background
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Setup the guide
{
  guide.style.width = `${canvas.width}px`;
  guide.style.height = `${canvas.height}px`;
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
    guide.insertAdjacentHTML("beforeend", "<div></div>")
  );
}

function handleCanvasMousedown(e) {
  isPainting = true
}

function handleCanvasMousemove(e) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }

  if (!isPainting) {
    return;
  }

  const canvasBoundingRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasBoundingRect.left;
  const y = e.clientY - canvasBoundingRect.top;
  const cellX = Math.floor(x / cellPixelLength);
  const cellY = Math.floor(y / cellPixelLength);
  const currentColor = colorHistory[`${cellX}_${cellY}`];

  if (e.ctrlKey) {
    if (currentColor) {
      colorInput.value = currentColor;
    }
  } else {
    fillCell(cellX, cellY);
  }
}

function fillCell(cellX, cellY) {
  const startX = cellX * cellPixelLength;
  const startY = cellY * cellPixelLength;

  ctx.fillStyle = colorInput.value;
  ctx.fillRect(startX, startY, cellPixelLength, cellPixelLength);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

function handleClearButtonClick() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  colorHistory = {};
}

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? null : "none";
}

//listens for events and calls relevent functions
canvas.addEventListener("mousedown", handleCanvasMousedown);
canvas.addEventListener("mousemove", handleCanvasMousemove);
canvas.addEventListener('mouseup', e => { //listen for when no longer drawing
  isPainting = false;
});
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
