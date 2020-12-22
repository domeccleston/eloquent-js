/*

  ----------------------------------------------- Exercise 1: Retry ------------------------------------------

 */
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b, count=1) {
  try {
    const result = primitiveMultiply(a, b);
    return result;
  } catch (error) {
    if (error instanceof MultiplicatorUnitFailure) {
      console.log(`Error. Retrying after ${count} attempts`)
      return reliableMultiply(a, b, ++count);
    }
  }
}

// console.log(reliableMultiply(8, 8));
// → 64

/*

  ----------------------------------------------- Exercise 2: Locked Box ------------------------------------------

 */

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  try {
    body();
    box.lock();
    return
  } finally {
    box.lock();
    return;
  }
}

// try {
//   withBoxUnlocked(function() {
//     throw new Error("Pirates on the horizon! Abort!");
//   });
// } catch (e) {
//   console.log("Error raised: " + e);
// }
// console.log(box.locked); // -> true