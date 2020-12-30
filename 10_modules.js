const fs = require('fs');
/*
- Write code that is easy to delete, not easy to extend.

Tef, Programming is Terrible


   _____   _                       _                     __    ___
  / ____| | |                     | |                   /_ |  / _ \   _
 | |      | |__     __ _   _ __   | |_    ___   _ __     | | | | | | (_)
 | |      | '_ \   / _` | | '_ \  | __|  / _ \ | '__|    | | | | | |
 | |____  | | | | | (_| | | |_) | | |_  |  __/ | |       | | | |_| |  _
  \_____| |_| |_|  \__,_| | .__/   \__|  \___| |_|       |_|  \___/  (_)
                          | |
                          |_|
  __  __               _           _
 |  \/  |             | |         | |
 | \  / |   ___     __| |  _   _  | |   ___   ___
 | |\/| |  / _ \   / _` | | | | | | |  / _ \ / __|
 | |  | | | (_) | | (_| | | |_| | | | |  __/ \__ \
 |_|  |_|  \___/   \__,_|  \__,_| |_|  \___| |___/
 */

 /*
MODULE:

A piece of a program that specifies which other pieces it relies on, and which functionality
it provides for other modules to use (its interface).

Module interfaces expose part of the module to the outside world, and keep the rest private.
By restricting the ways in which modules interact with each other, the system becomes more like
lego (where pieces interact through well-defined connectors) and less like a mud, where everything
mixes with everything.

The relations between modules are called dependencies.
 */

/*
PACKAGE:

When writing software, we aim to make code re-usable (since duplicated code increase maintenance cost)

Packages help with this. A package features

- One or more modules
- Information about what other packages it depends on
- Documentation explaining what it does, so people that didn't write it can still use it

When bugs are fixed or new features are added, the package is updated. Now the programs that depend on it
can upgrade to the new version.

In the Javascript world, this infrastructure is provided by NPM.
*/

/*
MODULE STYLES

IMPROVISED MODULES:
*/

const improvisedModule = function() {
   const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"];
   return {
      day(number) { return days[number] },
      number(day) { return days.indexOf(day) }
   }
}();

/*
This uses an IIFE to create an object namespace for a module's bindings.
It doesn't handle dependencies, and so is now mostly obsolete.
*/

/*
COMMONJS MODULES:

Loading dependencies requires being able to execute strings as code.
We can define a minimal form of 'require' that does this, using the
Function constructor.

How this works:
   - Read the code from a file into a variable
   - Initialize a module object with an empty exports property
   - Store that initial object in our require cache
   - Create a wrapper function that takes some parameters:
      - Require: allow that code to make nested require calls (I think)
      - Exports: Pass our (currently empty) module.exports for code to overwrite
      - Module: Longhand of overwriting module.exports (?)
   - So we will end up with
      - function wrapper(require, exports, module) {
         module.exports = { count: () => [1, 2, 3]}
      }
   - When we call this function, we overwrite the empty module.exports.
   - Then we return the (now cached) module.
*/

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

const { count } = myRequire('notepad.js');

console.log(count())


/*
EXERCISES

(1) Modular Robot: redesign Chapter 7's bindings as a modular program

- graph.js
   - Export a buildGraph function that uses an existing NPM package to build a graph,
   accepting an array of two-element arrays
- road.js
   - Contain raw roads data. Call buildGraph with this data and export result.
   - Depends on ./graph
- state.js
   - Contain VillageState class
   - Depend on ./road
   - Depend on external randomPick module
   - export VillageState
- robots.js
   - Export runRobot
   - Export example robots such as goalOrientatedRobots
*/

