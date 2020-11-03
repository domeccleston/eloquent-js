/* Iterators: a matrix class that implements the iterator protocol on its prototype */

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      this.content[y * width + x] = element(x, y);
    }
  }
}

  get(x, y) {
    return this.content[y * this.width + x];
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y === this.matrix.height) {
      return {
        done: true
      }
    }

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y)
    }

    this.x++;

    if (this.x === this.matrix.width) {
      this.x = 0;
      this.y++;
    }

    return {
      value,
      done: false,
    }
  }
}

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
}

/* Getters and setters */

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
}

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheiht(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

/* Inheritance */

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    })
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

// Vector class

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x ** 2, this.y ** 2);
  }
}

/*
Group class: simple set-style data structure
*/

class Group {
  constructor() {
    this.items = {};
    this.current = null;
  }

  add(item) {
    if (!(item in this.items)) {
      this.items[item] = item;
    }
  }

  delete(item) {
    try {
      delete this.items[String(item)]
    } catch {
      throw new Error(`Item not present. Group consists of: ${JSON.stringify(this.items)}`);
    }
  }

  has(item) {
    return item in this.items;
  }

  static from(iterable) {
    const groupFromIterable = new Group();
    for (let item of iterable) {
      groupFromIterable.add(item);
    }
    return groupFromIterable;
  }
}

class GroupIterator {

  constructor(group) {
    this.group = group;
    this.current = null;
  }

  next() {
    if (!this.current) this.current = 0;
    if (this.current === Object.keys(this.group.items).length) return { done: true };
    let value = Object.keys(this.group.items)[this.current];
    ++this.current;
    return {
      value,
      done: false
    }
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
}

/* We can use hasOwnProperty when we want to ignore the prototype’s properties.
But what if your map needs to include the word "hasOwnProperty"?
You won’t be able to call that method anymore because the object’s own property hides the method
value. */

let misnamedMap = {
  one: true,
  two: true,
  hasOwnProperty: true,
}

// console.log(misnamedMap.hasOwnProperty('one'));
// 'misnamedMap.hasOwnProperty is not a function'

console.log(Object.prototype.hasOwnProperty.call(misnamedMap, 'one'));

