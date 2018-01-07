import p5 from 'p5';

const getSize = () => {
  const a4 = 210 / 297;
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width / height > a4) {
    return [height * a4, height]
  }
  return [width, width / a4]
}

const getDraw = p => () => {
  p.fill(255);
  p.rect(10,10,50,50);
}

const s = p => {

  p.setup = () => {
    p.createCanvas(...getSize());
  };

  p.draw = getDraw(p);

  if (module.hot) {
    module.hot.dispose(() => p.remove());
  }
}

const myp5 = new p5(s, 'container');
