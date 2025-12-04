function drawGift(size, symbol) {
  let draw = "";
  if (size >= 2) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i == 0 || i == size - 1) {
          draw += symbol;
        } else {
          if (j == 0 || j == size - 1) {
            draw += symbol;
          } else {
            draw += " ";
          }
        }
        if (j == size - 1 && i !== size - 1) {
          draw += "\n";
        }
      }
    }
  }
  return draw;
}

const g1 = drawGift(4, "*");
console.log(g1);
