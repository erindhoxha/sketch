const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};


// Animate manually!
// const animate = () => {
//   console.log("Domestika!");
//   requestAnimationFrame(animate);
// }

// animate();

const sketch = ({ context, width, height }) => {
  console.log(context);
  console.log({});
  console.log(sketch);
  console.log(canvasSketch);

  const agents = [];
  for (let i = 0; i < 40; i++) {
    let x = random.range(0, width);
    let y = random.range(0, height);
    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    })
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(theContext) {
    theContext.save();
    theContext.translate(this.pos.x, this.pos.y);
    theContext.lineWidth = 4;
    theContext.beginPath();
    theContext.arc(0, 0, this.radius, 0, Math.PI*2);
    theContext.fill();
    theContext.stroke();
    theContext.restore();
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }
}