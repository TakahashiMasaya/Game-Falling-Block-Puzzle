import p5 from 'p5';

export const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = () => {
    p.background('#0f2350');
    p.noStroke();
    p.fill(255);
    p.ellipse(p.windowWidth / 2, p.windowHeight / 2, 50, 50);
  };
};
