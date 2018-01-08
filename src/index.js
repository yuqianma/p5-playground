import p5 from 'p5';
import * as addons from './addons';
import draw from './draw';

window.p5 = p5;
Object.assign(p5.prototype, addons);

const getSize = () => {
  return [window.innerWidth, window.innerHeight]
  // const a4 = 210 / 297;
  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // if (width / height > a4) {
  //   return [height * a4, height]
  // }
  // return [width, width / a4]
}

const getDraw = p => () => draw(p);

const s = p => {
  window.p = p;

  p.setup = () => {
    p.createCanvas(...getSize());
  };

  p.draw = getDraw(p);

  p.noLoop();

  let last = 0;
  const redraw = () => {
    const now = +new Date();
    if (now - last < 100) {
      return false
    }
    // console.time('redraw');
    p.redraw();
    // console.timeEnd('redraw');
    last = now;

    return false
  }

  p.mouseMoved = redraw;
  p.touchMoved = redraw;

  if (module.hot) {
    module.hot.dispose(() => p.remove());
  }
}

const myp5 = new p5(s, 'container');
