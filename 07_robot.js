const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  let start = randomPick(Object.keys(roadGraph));
  return new VillageState(start, parcels);
}

// runRobot(VillageState.random(), randomRobot);

/*
 Pausing to recap:
 What does the above function call do?

 We call runRobot, passing in a randomized village state and our random robot.

 VillageState.random() creates our randomized village state. It takes a parcel
 count which defaults to five, and creates a new state with a randomized set of
 parcels and a starting position of the post office. Remember, a parcel is just
 an object with a place and an address.

 randomRobot() is the robot that we pass in to runRobot. It takes a state object
 that has a place attribute representing a location in our village graph, and
 returns an object with a direction property based on a random pick from the
 edges accessible from its current place.

 runRobot() runs a loop until there are no more parcels in state. It
 obtains a new direction from running its provided 'robot' behaviour function.
 It calls move(), moving to that direction and depositing a parcel if there
 was one for that location.

*/

/*

  We can improve upon our random robot by providing it with a route that
  passes every location in the town. The robot will require max two full
  passes through this route in order to pick up and deliver all of its
  parcels.

*/

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

/*

  Let's improve further through implementing some pathfinding.

*/

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

// console.log(roadGraph)
// console.log(roadGraph['Alice\'s House'])
// console.log(findRoute(roadGraph, 'Alice\'s House', 'Farm'));

// const roads = [
//   "Alice's House-Bob's House",   "Alice's House-Cabin",
//   "Alice's House-Post Office",   "Bob's House-Town Hall",
//   "Daria's House-Ernie's House", "Daria's House-Town Hall",
//   "Ernie's House-Grete's House", "Grete's House-Farm",
//   "Grete's House-Shop",          "Marketplace-Farm",
//   "Marketplace-Post Office",     "Marketplace-Shop",
//   "Marketplace-Town Hall",       "Shop-Town Hall"
// ];

const first = new VillageState('Post Office', [{ place: 'Post Office', address: 'Alice\'s House' }]);

function goalOrientedRobot({place, parcels}, route) {
  let parcelRoutes = parcels.map(p => {
    return {
      place: p.place,
      route: JSON.stringify(findRoute(roadGraph, place, p.place)),
      address: p.address
    }
  })
  console.log({ place, parcelRoutes })
  if (route.length == 0) {
    let parcel = parcels[0]
    console.log(`choosing parcel ${JSON.stringify(parcel)}`)
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      console.log(`delivering parcel at ${place} to ${parcel.address}`)
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  console.log(`My current route is ${route}`)
  return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, []);

/* -------------------------------------------- EXERCISES --------------------------------------------- */

class CompareRobots {
  constructor(robot1, memory1, robot2, memory2) {
    this.robot1 = robot1;
    this.robot2 = robot2;
    this.memory1 = memory1;
    this.memory2 = memory2;
    this.tasks = this.generateTasks();
  }

  generateTasks(n = 100) {
    const tasks = [];
    for (let i = 0; i < n; i++) {
      const randomTask = VillageState.random();
      tasks.push(randomTask);
    };
    return tasks;
  }

  solveTasks(robot, memory) {
    const solutionTimes = this.tasks.map(task => runRobot(task, robot, memory));
    const meanTime = solutionTimes.reduce((acc, cur) => acc + cur) / solutionTimes.length;
    return meanTime.toFixed(3);
  }

  compare() {
    const robot1Score = this.solveTasks(this.robot1, this.memory1);
    const robot2Score = this.solveTasks(this.robot2, this.memory2);

    return `
    Robot 1 took an average of ${robot1Score} steps to solve ${this.tasks.length} tasks.
    Robot 2 took an average of ${robot2Score} steps to solve ${this.tasks.length} tasks.
    `
  }

}

// const robotComparer = new CompareRobots(
//   routeRobot,
//   [],
//   goalOrientedRobot,
//   []
// );

// console.log(robotComparer.compare())

/*

02: OPTIMIZE A ROBOT

How can we improve the goal-oriented robot's performance?

*/


/*

If not all of the parcels have been collected (memory.parcels.length !== parcels.length), keep picking up
parcels: move to the square containing them.

*/