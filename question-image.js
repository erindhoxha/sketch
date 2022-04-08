const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1900, 1500 ],
  animate: true,
  // Set loop duration to 3
  duration: 10,
  // Use a small size for better GIF file size
  // Optionally specify a frame rate, defaults to 30
  fps: 60
};

let manager, image;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height, time = 20}) => {
  const cell = 20;
  const cols = Math.floor(width  / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width  = cols;
  typeCanvas.height = rows;

  return ({ context, width, height, time = 20 }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';


    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // const x = col * cell + random.range(-cell, cell) * 0.1;
      // const y = row * cell + random.range(-cell, cell) * 0.1;

      const x = col * cell + 0;
      const y = row * cell + 0;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random(0.1, 0.12) < 0.2) context.font = `${cell * 0.00001}px ${fontFamily}`;

      context.fillStyle = 'white';

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);
      
      context.restore();
    }
    
    context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return 'v';
  if (v < 150) return '^';
  if (v < 200) return '=';

  const glyphs = '.'.split('');

  return ".";
};


const onKeyUp = (e) => {
  // text = e.key.toUpperCase();
  // manager.render();
};

// document.addEventListener('keyup', onKeyUp);

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const url = './download.png';
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();
