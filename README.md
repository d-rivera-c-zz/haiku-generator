# Haiku generator

Just generates haikus. In english.

[Haiku rules](http://grammar.yourdictionary.com/style-and-usage/rules-for-writing-haiku.html):

> There are no specific rules for writing haiku; however, the structure of haiku is always the same, including the following features:  
> - Only three lines, totaling 17 syllables throughout  
> - The first line is only 5 syllables  
> - The second line is 7 syllables  
> - The third line is 5 syllables like the first  
> - Punctuation and capitalization rules are up to the poet, and need not follow rigid rules used in structuring sentences  
> - Haiku does not have to rhyme, in fact many times it does not rhyme at all  
> - Some haiku can include the repetition of words or sounds

## Installation

````
$> git clone https://github.com/d-rivera-c/haiku-generator.git
$> cd haiku-generator
$> npm install
````

## Usage

Call the haiku generator default behaviour. Uses random words for the whole haiku. These are _real_ english words.

````
$> node haiku.js
````

### Options

There's a few cli options you can use to generate different type of haikus

#### --all_random

Default behaviour, uses all random unrelated words.

#### -- theme (word)

You can suggest a word so the haiku is related to the "theme". Uses an [API](https://api.datamuse.com) to get related words.
The final haiku could be "related" but not necessarily using the words.

````
$> node haiku.js --theme wind // haiku hopefully related to wind
````

#### Others -- TO BE IMPLEMENTED

## Make it talk

Use this command to make the computer read the generated haiku

````
$> node haiku.js <additional params> | tee /dev/tty | say
````