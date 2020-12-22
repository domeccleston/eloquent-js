/*
Some people, when confronted with a problem, think ‘I know, I’ll use regular expressions.’ Now they have two problems.

- Jamie Zawinski
*/

/*
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

let dateTime = /\d\d\/\d\d\/\d\d\d\d \d\d:\d\d/
console.log(dateTime.test('22/12/2020 10:02')); // :/

let notAlphabetical = /[^A-z]/; // matches any non-alphabetical character
console.log(notAlphabetical.test('123'))
console.log(notAlphabetical.test('Abc'))
console.log(notAlphabetical.test('GRt3'))

