const Y_AXIS = 'y';
const X_AXIS = 'x';

export function linearGradient(x, y, w, h, c1, c2, axis) {
  const p = this;

  p.push();

  p.noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = p.map(i, y, y+h, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = p.map(i, x, x+w, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(i, y, i, y+h);
    }
  }

  p.pop();
}