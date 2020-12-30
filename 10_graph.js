/**
 * @function buildGraph
 * @param {Array<Array<string>>} edges
 * Accepts an array of two-element arrays representing source and destination.
 */
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

module.exports = {
  buildGraph
}