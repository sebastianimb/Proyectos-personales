// B. Matrix Rotation
// time limit per test
// 2 seconds
// memory limit per test
// 512 megabytes
// You have a matrix 2×2
// filled with distinct integers. You want your matrix to become beautiful. The matrix is beautiful if the following two conditions are satisfied:
//     in each row, the first element is smaller than the second element;
//     in each column, the first element is smaller than the second element.
// You can perform the following operation on the matrix any number of times: rotate it clockwise by 90
// degrees, so the top left element shifts to the top right cell, the top right element shifts to the bottom right cell, and so on:
// Determine if it is possible to make the matrix beautiful by applying zero or more operations.
// Input
// The first line contains one integer t
// (1≤t≤1000
// ) — the number of test cases.
// Each test case consists of two lines. Each of those lines contains two integers — the elements of the corresponding row of the matrix. In each matrix, all four elements are distinct integers from 1
// to 100
// .
// Output
// For each test case, print YES if the matrix can become beautiful, or NO otherwise. You may print each letter in any case (YES, yes, Yes will all be recognized as positive answer, NO, no and nO will all be recognized as negative answer).

const fs = require("fs").promises;
(async () => {
  try {
    const data = await fs.readFile("datos.txt", "utf8");

    n_total = data.split("\n")[0];
    length = data.split("\n").length - 1;

    rows_data = [];
    decode_data = [];
    data_split = data.split("\n");
    data_split.shift();

    for (const row of data_split) {
      const row_split = row.split(" ").map(Number);
      rows_data.push(row_split);
    }

    const arrays = [];
    for (let i = 0; i < rows_data.length; i += 2) {
      arrays.push([rows_data[i], rows_data[i + 1]].flat());
    }
    console.log(arrays);
    result = [];

    for (const matrix of arrays) {
      result.push(is_beatiful(matrix));
    }

    //Se debe crear nuevo archivo output.txt con los datos decodificados
    let output_data = result.join("\n");
    await fs.writeFile("output.txt", output_data);
  } catch (err) {
    throw new Error(err);
  }
})();

function is_beatiful(matrix) {
  // [0]>[1] [0]>[2] [1]>[3] [2]>[3] -> is beatiful
  for (let i = 0; i < 4; i++) {
    if (
      matrix[0] > matrix[1] &&
      matrix[0] > matrix[2] &&
      matrix[1] > matrix[3] &&
      matrix[2] > matrix[3]
    ) {
      return "YES";
    } else {
      rotate_once_time(matrix);
    }
  }
  return "NO";
}

function rotate_once_time(matrix) {
  let temp = matrix[0];
  matrix[0] = matrix[2];
  matrix[2] = matrix[3];
  matrix[3] = matrix[1];
  matrix[1] = temp;
}
