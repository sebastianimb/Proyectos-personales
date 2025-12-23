/**
@param {string[]} factory - The factory layout
@returns {'completed'|'broken'|'loop'} Result of the gift journey
**/
function runFactory(factory) {
  for (let i = 0; i < factory.length; i++) {
    const currentRow = factory[i];
    const prevRow = factory[i - 1];
    const nextRow = factory[i + 1];

    for (let j = 0; j < currentRow.length; j++) {
      if (currentRow[j] === ".") return "completed";

      const isCompleteTop =
        prevRow !== undefined && prevRow[j] === "." && currentRow[j] === "^";
      const isCompleteLeft =
        currentRow[j - 1] !== undefined &&
        currentRow[j - 1] === "." &&
        currentRow[j] === "<";
      const isCompleteRight =
        currentRow[j + 1] !== undefined &&
        currentRow[j + 1] == "." &&
        currentRow[j] === ">";
      const isCompleteBottom =
        nextRow !== undefined && nextRow[j] == "." && currentRow[j] === "v";
      const isCompleted =
        isCompleteTop || isCompleteLeft || isCompleteRight || isCompleteBottom;
      if (isCompleted) return "completed";

      const isBrokenTop = prevRow === undefined && currentRow[j] == "^";
      const isBrokenLeft =
        currentRow[j - 1] === undefined && currentRow[j] == "<";
      const isBrokenRight =
        currentRow[j + 1] === undefined && currentRow[j] == ">";
      const isBrokenBottom = nextRow === undefined && currentRow[j] == "v";
      const isBroken =
        isBrokenTop || isBrokenLeft || isBrokenRight || isBrokenBottom;
      if (isBroken) return "broken";

      const isLoopTop =
        prevRow !== undefined && prevRow[j] === "v" && currentRow[j] == "^";
      const isLoopLeft =
        currentRow[j - 1] !== undefined &&
        currentRow[j - 1] == ">" &&
        currentRow[j] == "<";
      const isLoopRight =
        currentRow[j + 1] !== undefined &&
        currentRow[j + 1] == "<" &&
        currentRow[j] == ">";
      const isLoopDown =
        nextRow !== undefined && nextRow[j] === "^" && currentRow[j] == "v";

      const isLoop = isLoopTop || isLoopLeft || isLoopRight || isLoopDown;
      if (isLoop) return "loop";
    }
  }
  return "error";
}

console.log(runFactory([">>."])); // 'completed'

console.log(runFactory([">>>"])); // 'broken'

console.log(runFactory([">><"])); // 'loop'

console.log(runFactory([">>v", "..<"])); // 'completed'

console.log(runFactory([">>v", "<<<"])); // 'broken'

console.log(runFactory(["v.", "^."])); // 'loop'

console.log(runFactory([">v.", "^.."])); // 'completed'
