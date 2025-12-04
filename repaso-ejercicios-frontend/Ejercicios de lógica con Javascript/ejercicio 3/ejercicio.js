"use strict";
function manufactureGifts(giftsToProduce) {
  // Code here
  return giftsToProduce.flatMap((gift) => {
    const quantity = gift.quantity;
    const limit = isNaN(quantity) || quantity < 0 ? 0 : gift.quantity;
    return Array(limit).fill(gift.toy);
  });
}

const production1 = [
  { toy: "car", quantity: 3 },
  { toy: "doll", quantity: 1 },
  { toy: "ball", quantity: 2 },
];

const res = manufactureGifts(production1);
console.log(res);
