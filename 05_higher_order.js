const SCRIPTS = require('./scripts')

/**
 * Takes an array of arrays and returns a single array with all the input array's elements.
 * @param {Array>} arrays
 * @returns {Array}
 */
function flatten(arrays) {

  function flat(acc, cur) {
    return Array.isArray(cur)
    ? cur.reduce(flat, acc)
    : [...acc, cur];
  }

  return arrays.reduce(flat, [])
}

/**
 * Iterate a specified number of times, calling a body function for as long as a test function
 * returns true.
 * @param {*} value
 * @param {function} test
 * @param {function} update
 * @param {function} body
 */
function loop(value, test, update, body) {
  for (let i = value; test(i); i = update(i)) {
    body(i);
  }
}

/**
 * Returns true when the given function returns true for every array element.
 * @param {Array} arr
 * @param {function} cond
 * @returns {boolean}
 */
function every(arr, cond) {
  for (let el of arr) {
    if (!cond(el)) {
      return false;
    }
  }
  return true;
}

function characterScript(code, scripts) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

/**
 * Computes the dominant writing direction in a string of text. See scripts.js for example data.
 */
function dominantWritingDirection(text) {

  const counts = text
    .split('')
    .map(char => char.charCodeAt(char))
    .map(char => characterScript(char))
    .filter(el => el !== null)
    .map(el => el.direction)
    .reduce((acc, cur) => {
      return cur === 'ltr'
      ? { ...acc, ltr: ++acc.ltr }
      : { ...acc, rtl: ++acc.rtl }
    }, { ltr: 0, rtl: 0 })

    return counts[ltr] > counts[rtl] ? 'ltr' : 'rtl';
}

console.log(dominantWritingDirection("Hey, مساء الخير"));