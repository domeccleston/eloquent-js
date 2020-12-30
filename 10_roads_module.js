const fs = require('fs');

const buildGraph = myRequire('10_graph.js');

function myRequire(name) {
  if (!(name in require.cache)) {
     // will not work in the browser
     let code = fs.readFileSync(name);
     let module = { exports: {} };
     require.cache[name] = module;
     let wrapper = Function('require, exports, module', code);
     wrapper(require, module.exports, module);
  }
  return require.cache[name].exports;
}

const roads = [
  [ 'Alice\'s House', 'Bob\'s House' ],
  [ 'Alice\'s House', 'Cabin' ],
  [ 'Alice\'s House', 'Post Office' ],
  [ 'Bob\'s House', 'Town Hall' ],
  [ 'Daria\'s House', 'Ernie\'s House' ],
  [ 'Daria\'s House', 'Town Hall' ],
  [ 'Ernie\'s House', 'Grete\'s House' ],
  [ 'Grete\'s House', 'Farm' ],
  [ 'Grete\'s House', 'Shop' ],
  [ 'Marketplace', 'Farm' ],
  [ 'Marketplace', 'Post Office' ],
  [ 'Marketplace', 'Shop' ],
  [ 'Marketplace', 'Town Hall' ],
  [ 'Shop', 'Town Hall' ]
]

const roadGraph = buildGraph(roads);

module.exports = {
  roadGraph
}