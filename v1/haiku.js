var RandomWord = require('random-word');
var Syllable = require('syllable');

/**
 * Create one line
 */
var createLine = function (syllableCount) {
  if (syllableCount === void 0 || syllableCount !== parseInt(syllableCount, 10)) {
    syllableCount = 5;
  }

  var line = '';
  do {
    line = RandomWord() + ' ' + RandomWord() + ' ' + RandomWord();
  } while (Syllable(line) != syllableCount);

  return line;
};


/**
 * Generate haiku
 */
var haiku = [
  createLine(5),
  createLine(7),
  createLine(5)
];

console.log(haiku);