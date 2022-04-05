const canvasSketch = require('canvas-sketch');

// Sketch parameters
const settings = {
  dimensions: 'a4',
  pixelsPerInch: 300,
  units: 'px'
};

// Artwork function
const sketch = () => {
  return ({ context, width, height }) => {
    // Margin in inches
    const margin = 1 / 4;

    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, 'cyan');
    fill.addColorStop(1, 'orange');

    // Fill rectangle
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let w = 150;
            let h = 150;
            let gap = 20;
            let x = 100 + (w + gap) * i;
            let y = 100 + (h + gap) * j;
            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke(); 

            context.beginPath();
            context.rect(x + 8, y + 8, w - 16, h - 16);
            context.stroke();
        }
    }

  };
};

// Start the sketch
canvasSketch(sketch, settings);