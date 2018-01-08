const GoldenRatio = (1 + Math.sqrt(5)) / 2;

const Colors = [
  // '#13547a',
  // '#80d0c7',
  // '#ff758c',
  // '#ff7eb3',
  '#e14fad',
  '#f9d423',
];

const n = 10;
let colors;

export default (p) => {
  if (!colors) {
    const c1 = p.color(Colors[0]);
    const c2 = p.color(Colors[1]);
    colors = Array.apply(null, { length: n }).map((_, i) => {
      return p.lerpColor(c1, c2, i / n);
    });
  }

  const { width, height } = p;

  const cx = width / 2,
        cy = height / 2 ;

  function frame (w, h, c1, c2) {
    c1 = p.color(c1);
    c2 = p.color(c2);

    const x = width / 2 - w / 2,
          y = height / 2 - h / 2;

    // p.linearGradient(x, y, w, h, c1, c2, 'y');

    p.noStroke();
    p.fill(c1);
    p.rect(x, y, w, h);

    p.push();

    p.fill(c2);
    p.noStroke();
    p.triangle(x, y, x + w, y + h, x, y + h);

    p.rectMode(p.RADIUS);
    p.noFill();
    p.stroke(255);

    const r = w / 600;
    const d1 = 1 * r, d2 = 5 * r, gap = 3 * r;
    let sw;
    const off = () => sw / 2;
    const ow = () => w / 2 / GoldenRatio + off();
    const oh = () => h / 2 / GoldenRatio + off();

    p.strokeWeight(sw = d1);
    p.rect(cx, cy, ow(), oh());
    p.strokeWeight(sw = d2);
    p.rect(cx, cy, ow() + gap + d1, oh() + gap + d1);

    p.pop();
  }
  
  colors.unshift(colors.pop());

  const len = colors.length;
  
  Array.apply(null, { length: 10 }).map((_, i) => {
    frame(
      width / (GoldenRatio ** i),
      height / (GoldenRatio ** i),
      colors[i % len],
      colors[(i + 1) % len]
    );
  });
}
