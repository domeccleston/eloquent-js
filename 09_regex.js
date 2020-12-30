/*
Some people, when confronted with a problem, think ‘I know, I’ll use regular expressions.’ Now they have two problems.

- Jamie Zawinski

 _____   _                       _                       ___     ___
/ ____| | |                     | |                     / _ \   / _ \
| |      | |__     __ _   _ __   | |_    ___   _ __    | | | | | (_) | (_)
| |      | '_ \   / _` | | '_ \  | __|  / _ \ | '__|   | | | |  \__, |
| |____  | | | | | (_| | | |_) | | |_  |  __/ | |      | |_| |    / /
\_____| |_| |_|  \__,_| | .__/   \__|  \___| |_|       \___/    /_/   (_)
                        | |
                        |_|
 _____                           _                    ______                                            _
|  __ \                         | |                  |  ____|                                          (_)
| |__) |   ___    __ _   _   _  | |   __ _   _ __    | |__    __  __  _ __    _ __    ___   ___   ___   _    ___    _ __    ___
|  _  /   / _ \  / _` | | | | | | |  / _` | | '__|   |  __|   \ \/ / | '_ \  | '__|  / _ \ / __| / __| | |  / _ \  | '_ \  / __|
| | \ \  |  __/ | (_| | | |_| | | | | (_| | | |      | |____   >  <  | |_) | | |    |  __/ \__ \ \__ \ | | | (_) | | | | | \__ \
|_|  \_\  \___|  \__, |  \__,_| |_|  \__,_| |_|      |______| /_/\_\ | .__/  |_|     \___| |___/ |___/ |_|  \___/  |_| |_| |___/
                 __/ |                                              | |
                |___/                                               |_|
 */

let dateTime = /\d\d\/\d\d\/\d\d\d\d \d\d:\d\d/ // :/
let conciseDateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/; // :)

let notAlphabetical = /[^A-z]/; // matches any non-alphabetical character

function getDate(string) {
  const [_, month, day, year] = conciseDateTime.exec(string);
  return new Date(year, month - 1, day);
}

/* ------------------------------------------------- EXERCISES -------------------------------------------------
 */

/* 01. Regexp Golf

For each of the following items, write a regular expression to test
whether any of the given substrings occur in a string. The regular
expression should match only strings containing one of the substrings
described. Do not worry about word boundaries unless explicitly mentioned. When your expression works, see whether you can make it any smaller.

1. car and cat
2. pop and prop
3. ferret, ferry, and ferrari
4. Any word ending in ious
5. A whitespace character followed by a period, comma, colon, or semicolon
6. A word longer than six letters
7. A word without the letter e (or E)
*/

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}

verify(/ca(r|t)/,
  ["my car", "bad cats"],
  ["camper", "high art"]);

verify(/pr?op/,
  ["pop culture", "mad props"],
  ["plop", "prrrop"]);

verify(/ferr(y|et|ari)/,
  ["ferret", "ferry", "ferrari"],
  ["ferrum", "transfer A"]);

verify(/ious\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]);

verify(/\s[,-.]|;/,
  ["bad punctuation ."],
  ["escape the period"]);

verify(/\S{6,}/,
  ["Siebentausenddreihundertzweiundzwanzig"],
  ["no", "three small words"]);

verify(/\b([^ e])+\b/i,
  ["red platypus", "wobbling nest"],
  ["earth bed", "learning ape", "BEET"]);

/*
02. Quoting Style

Imagine you have written a story and used single quotation marks
throughout to mark pieces of dialogue. Now you want to replace all
the dialogue quotes with double quotes, while keeping the single
quotes used in contractions like aren’t.

Think of a pattern that distinguishes these two kinds of quote
usage and craft a call to the replace method that does the proper
replacement.

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/'/g, "\""));
// → "I'm the cook," he said, "it's my job."
*/

let text = "'I'm the cook,' he said, 'it's my job.'";
console.log(text.replace(/\W'|^'/g, "\""));

/*
03. Numbers Again

Write an expression that matches only JavaScript-style numbers.
It must support an optional minus or plus sign in front of the number,
the decimal dot, and exponent notation—5e-3 or 1E10—again with an optional sign
in front of the exponent. Also note that it is not necessary for there to be digits
in front of or after the dot, but the number cannot be a dot alone. That is, .5 and 5. are valid
JavaScript numbers, but a lone dot isn’t.

 */

 // Fill in this regular expression.
let number = /[+\-]?([0-9]\.?e?)|(.[0-9])/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}