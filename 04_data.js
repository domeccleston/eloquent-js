/**
 * Takes two numbers, and returns an array containing all the numbers from the start and up to and
 * including the end.
 *
 * @param {number} start
 * @param {number} end
 * @param {number} [step=1]
 * @returns {Array}
 */
function range(start, end, step=1) {

  const args = Array.from(arguments);

  if (args.length < 2 || !args.every(arg => typeof arg === 'number')) {
    throw new Error('Input must be 2 or 3 integers in the form of start, end, and optional step.');
  }

  if (start > end && step > 0) {
    throw new Error('Start must be smaller than end, unless step is negative.');
  }

  numbers = [];

  if (start < end) {
    for (let i = start; i <= end; i += step) {
      numbers.push(i);
    }
  } else {
      for (let i = start; i >= end; i += step) {
        numbers.push(i);
        console.log(numbers);
    }
  }

  return numbers;
};

/**
 * Takes an array of numbers and returns their sum.
 * @param {Array<number>} numbers
 * @returns {number}
 */
function sum(numbers) {
  function _reduce(arr, cb, start) {
    let total = start;
    if (!total) {
      let total = arr[0];
      for (let i = 1; i < arr.length; i++) {
        total = cb(total, arr[i])
      }
      return total;
    }
    else {
      let total = start;
      for (let i of arr) {
        total = cb(total, i)
      }
      return total;
    }
  }

  if (!isArray(numbers)) {
    throw new Error('Input must be an array of integers.');
  }

  return _reduce(numbers, (acc, cur) => acc + cur);
}

/**
 * Takes an array as an argument and returns it in reverse order.
 * @param {Array} arr
 * @returns {Array}
 */
function reverseArray(arr) {
  reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

/**
 * Takes an array as an argument and returns it in reverse order.
 * @param {Array} arr
 * @returns {Array}
 */
function reverseArrayInPlace(arr) {

  for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
    [arr[i], arr[arr.length - (i + 1)]] = [arr[arr.length - (i + 1)], arr[i]]
  }

  return arr;
}


/**
 * Takes an array as input, and creates a 'list' data structure with the following structure:
 *
 * let list = {
 *   value: 1,
 *   rest: {
 *     value: 2,
 *     rest: {
 *       value: 3,
 *       rest: null
 *     }
 *   }
 * };
 *
 * @param {Array} array
 * @returns {Object}
 */
function arrayToList(array) {

  if (!Array.isArray(array)){
    array = [array];
  }

  const list = {};
  list.value = array[0];
  if (array[1] === undefined) {
    list.rest = null;
    return list;
  } else {
    list.rest = arrayToList(array.slice(1))
    return list;
  }
}

/**
 * Creates an array from a list, structured as in 'list' in line 100.
 * @param {Object} list
 * @param {Array} [array=[]]
 * @returns {Array}
 */
function listToArray(list, array = []) {

  (function iterateList(list) {
    array.push(list.value);
    return !list.rest ? array : iterateList(list.rest);
  }(list));

  return array;
}

/**
 * Accepts an element and a list and adds the former to the latter to return a new list.
 * @param {*} element
 * @param {Object} list
 * @returns {Object}
 */
function prepend(element, list) {
  const newList = {
    value: element,
    rest: list,
  }
  return newList;
}

/**
 * Takes a list and a index i and returns the element at i, or undefined.
 * @param {Object} list
 * @param {number} i
 * @returns {number | undefined}
 */
function nth(list, i) {
  let count = 0;

  const iterateList = (list, count) => {

    if (typeof count !== 'number' || typeof list !== 'object') {
      throw new Error('Count must be an integer');
    }


   if (count === i) {
      return list.value;
    } else if (!list.rest) {
      return undefined;
    } else {
      return iterateList(list.rest, count + 1);
    }
  }

  return iterateList(list, count)
}

/*
 Interesting for-loop specification for doing this iteratively, from the book:
 for (let node = list; node; node = node.rest) {}
*/

// const list = {
//   value: 1,
//   rest: {
//     value: 2,
//     rest: {
//       value: 3,
//       rest: null
//     }
//   }
// }

/**
 * Takes two values and compares them by value.
 * @param {*} valA
 * @param {*} valB
 * @returns {boolean}
 */
function deepEqual(valA, valB) {
  if (valA == null && valB == null) {
    return true;
  } else if (!(typeof valA === 'object' && typeof valB === 'object')) {
    return valA === valB;
  } else {
    const aKeys = Object.keys(valA);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let key of aKeys) {
      console.log(key)
      if (!deepEqual(valA[key], valB[key])) {
        return false;
      }
    }

    return true;
  }
}

const obj1 = {
  here: {
    is: "an"
  },
  object: 2
}

const obj2 = {
  here: {
    is: "an"
  },
  object: 2
}

const obj3 = {
  here: {
    is: "some"
  },
  object: 2
}