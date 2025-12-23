/**
 * @param {number[]} gifts - The gifts to pack
 * @param {number} maxWeight - The maximum weight of the sleigh
 * @returns {number | null} The number of sleighs needed
 * Return null if no sleigh can carry all the gifts
 */
function packGifts(gifts, maxWeight) {
  if (gifts.length === 0) return 0;
  let acc = 0;
  let count = 0;
  for (let index = 0; index < gifts.length; index++) {
    const giftWeight = gifts[index];
    if (giftWeight > maxWeight) {
      return null;
    }
    if (acc + giftWeight <= maxWeight) {
      acc = acc + giftWeight;
    } else {
      count++;
      acc = giftWeight;
    }
  }
  if (acc > 0) count++;
  return count;
}

console.log(packGifts([2, 3, 4, 1], 5));
// 2 trineos
// Trineo 1: 2 + 3 = 5
// Trineo 2: 4 + 1 = 5

console.log(packGifts([3, 3, 2, 1], 3));
// 3 trineos
// Trineo 1: 3
// Trineo 2: 3
// Trineo 3: 2 + 1 = 3

console.log(packGifts([1, 1, 1, 1], 2));
// 2 trineos
// Trineo 1: 1 + 1 = 2
// Trineo 2: 1 + 1 = 2

console.log(packGifts([5, 6, 1], 5));
// null
// Hay un regalo de peso 6 que no cabe

console.log(packGifts([], 10));
// 0 trineos
// No hay regalos que entregar
