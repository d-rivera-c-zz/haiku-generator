/**
 * Generates haikus, just because.
 * It can generate pure random haikus or others that are hopefully more logical/related
 * 
 * --all-random       uses all random unrelated words
 * --random           uses random start word, but haiku must relate to the random word
 * --mandatory        words that must appear in the haiku
 * --related          words to create a haiku from, the final haiku could be "related" but not necessarily using the words
 * --opposite         haiku must be contrary or using antonyms for these words
 * --random           percentage of aleatory words in the haiku
 * --smart            use learned knowledge from previous liked haikus
 */

var Stdio = require('stdio');
var RandomWord = require('random-word');
var Syllable = require('syllable');
var Request = require('rest-request');
var RestAPI = new Request('https://api.datamuse.com');


/** 
 * Gets options from command line 
 */
var commands = Stdio.getopt({
  'all_random': { key: 'a', description: 'Use all random unrelated words for the whole poem'}
});

var createRandomLine = function (syllableCount) {
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
 * Create one line of haiku
 */
var createLine = function (syllableCount, wordPool) {
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

var randomHaiku = function () {
  var haiku = [
    createRandomLine(5),
    createRandomLine(7),
    createRandomLine(5)
  ];
  
  console.log(haiku);
};

var haiku = function (mainWords) {
  /**
   * Make the call to the API
   */
  RestAPI.get('/words', {rel_jja: mainWords, max: 100})
        .then(
            function (words) {
              // TODO: this can come back null, handle the error
              var wordPool = words;

              /**
               * 
               */
              var haiku = [
                createLine(5, wordPool),
                createLine(7, wordPool),
                createLine(5, wordPool)
              ];

              console.log(haiku);
            },
            function () {
              console.log('There\'s an error with something?');
            }

  );
};

// // if there's no words requested, the haiku will be all random words
// if (commands.words === void 0) {
//   randomHaiku();
// } else {
//   haiku(commands.words);
// }

if (commands.all_random) {
  randomHaiku();
}