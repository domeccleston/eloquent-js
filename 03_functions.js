

/**
 * Takes two integers and returns their minimum.
 *
 * @param {number} numA
 * @param {number} numB
 * @returns {number}
 */
function min(numA, numB) {
  return numA < numB ? numA : numB;
}

/**
 * Return true if an integer is even.
 *
 * @param {number} num
 * @returns {boolean}
 */
function isEven(num) {
  abs = Math.abs(num);
  return abs === 0 ? true : abs === 1 ? false : isEven(num - 2);
}

/**
 * Return the number of a given character in a string.
 *
 * @param {string} str
 * @param {string} char
 * @param {number} [count = 0]
 * @returns {number}
 */
function countChars(str, char, count = 0) {
  if (str.length === 0) {
    return count;
  } else {
    if (str[str.length - 1] === char) {
      count += 1;
    }
    return countChars(str.slice(0, str.length - 1), char, count);
  }
}