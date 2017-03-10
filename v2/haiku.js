
var RandomWord = require('random-word');
var Syllable = require('syllable');
var Request = require('rest-request');
var RestAPI = new Request('https://api.datamuse.com');

// just one param word
var mainWord = process.argv[2];
var wordPool = [];
var haiku = [];

if (mainWord === void 0 || mainWord === null) {
  mainWord = RandomWord();
  console.log(mainWord);
}

/**
 * Create one line of haiku
 */
var createLine = function (syllableCount) {
  if (syllableCount === void 0 || syllableCount !== parseInt(syllableCount, 10)) {
    syllableCount = 5;
  }

  var line = '';
  var totalSyllableCount = 0;
  do {
    line += ' ' + wordPool[Math.floor(Math.random() * wordPool.length)].word;
    totalSyllableCount = Syllable(line);

    if (totalSyllableCount > syllableCount) {
      line = '';
      totalSyllableCount = 0;
    }
  } while (totalSyllableCount < syllableCount);

  return line.trim();
};

/**
 * Make the call to the API
 */
RestAPI.get('/words', {rel_jja: mainWord, max: 100})
       .then(function (words) {
          wordPool = words;

          /**
           * 
           */
          var haiku = [
            createLine(5),
            createLine(7),
            createLine(5)
          ];

          console.log(haiku);
       }
);