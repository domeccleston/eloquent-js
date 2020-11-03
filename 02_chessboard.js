/*
Write a program that creates a string that
represents an 8×8 grid, using newline characters to separate lines.
At each position of the grid there is either a space or a "#" character.
The characters should form a chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #

When you have a program that generates this pattern,
define a binding size = 8 and change the program so that it works for any size,
outputting a grid of the given width and height.

create string ''
iterate from 0 to size
if index is even, append ' # # # #'
else append '# # # # '
*/

function createRow(width, index) {
  if (index % 2 === 0) {
    baseStr = ' #';
  } else {
    baseStr = '# ';
  };

  return baseStr.repeat(width / 2) + '\n';
}

function chessBoard(size) {
  let boardString = '';
  for (let i = 0; i < size; i++) {
    boardString += createRow(size, i);
  }
  boardString = boardString.slice(0, boardString.length - 1);
  return boardString;
};

console.log(chessBoard(4));