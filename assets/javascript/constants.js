// @ts-check

/**
 * jQuery object
 * @external jQuery
 * @see {@link http://api.jquery.com/jQuery/}
 */

//const timerID

/**
 * JQuery selector function
 * @external $
 * @function $
 * @see {@link http://api.jquery.com/jQuery/}
 */

/**
 * JQuery-UI does not have and @type library in npm
 * 
 */

/**
 * Starting score for game, goes down with more time and bad guesses
 * @constant
 * @type {number}
 * @default
 */
const gameStartScore = 500;

/**
 * User instructions before game start
 * @constant
 * @type {string}
 * @default
 */
const gameInstructions =
    "Choose your hero character first.  " +
    "Then choose 3 opponents, one at a time.  " +
    "The experience of fighting will build your attack strengh, " +
    "so choose weakest opponent first, and learn.  " +
    "Use arrow-keys or buttons to move towards opponent and attack.  " +
    "Survive defeating 3 opponents while keeping positive Health Points (HP)." +
    "<br><br><strong>Hit any key to continue once you have read the instructions above.</strong>";

/**
 * User instructions before game start
 * @constant
 * @type {string}
 * @default
 */
const universeSavedInstruction =
    "Thank you for saving this universe.  " +
    "<strong>Hit any key to save this or any other universe. </strong> ";

/**
 * User instructions before game start
 * @constant
 * @type {string}
 * @default
 */
const allIsLostInstruction =
    "This universe has been lost forever. " +
    "<strong>Hit any key to try and save another universe.  </strong>";

/**
 * User instructions to select hero
 * @constant
 * @type {string}
 * @default
 */
const chooseHeroInstructions =
    "Choose one of the these characters as your alter-ego.  ";

//   const parseS = (sString) => Number(sString.slice(sString, -1, 1));     // parse out "s" return integer

/**
 * Parse out px from the string and return number, to manipulate px attribute values in JQuery
 * @function parsePX
 * @param {string} pxString 
 */
const parsePX = (pxString) => Number(pxString.slice(pxString, -2, 2)); // parse out "px" return integer
//const parsePX = (pxString) => Number(pxString.slice(-2)); // parse out "px" return integer

/**
 * Parse out the s from string and return number, to manipulate s attribute values in JQuery
 * @function parseS
 * @param {string} sString 
 */
const parseS = (sString) => Number(sString.slice(sString, -1, 1));     // parse out "s" return integer



/**
 * Alias for id=gameSpace getElement
 * @constant
 * @type {JQuery}
 * @default
 */
const gameSpace = $("#gameSpace");

/**
 * Added to gameSpaceWidth to get complete width dimension of gameSpace for game
 * @constant
 * @type {number}
 * @default
 */
const gameSpacePadding = parsePX(gameSpace.css('padding-right'));

/**
 * game is played within this width
 * @constant
 * @type {number}
 * @default
 */
const gameSpaceWidth = gameSpace.width() + (gameSpacePadding * 2);

/**
 * game is played within this width
 * @constant
 * @type {number}
 * @default
 */
const gameSpaceHeight = gameSpace.height();

/**
 * Used in relocateVillain for random reset of villain position after contact
 * @type {string}
 */
var topPosition = "";

/**
 * Used in relocateVillain for random reset of villain position after contact
 * @type {string}
*/
var leftPosition = "";


/**
 * Alias for id=gameHelp selector
 * @constant
 * @type {JQuery}
 * @default
 */
const gameHelp = $("#gameHelp");

/**
 * Alias for id=hangmanPhoto JQuery selector
 * @constant
 * @type {JQuery}
 * @default
 */
// const hero = $("#hero");


/**
 * Alias for id=composerClues getElement
 * @constant
 * @type {JQuery}
 * @default
 */
const gameClues = $("#gameClues");

/**
 * Alias for id=gameScoreId getElement
 * @constant
 * @type {JQuery}
 * @default
 */
const gameStatus = $("#gameStatus");

/**
 * Alias for id=gameAudio getElement
 * @constant
 * @type {HTMLElement}
 * @default
 */
const gameAudio = document.getElementById("gameAudio");

/**
 * Hero div for game
 * @type {JQuery}
 * @default
 */
const hero = $("<div id=hero>");


/**
 * Outer edge of hero in px
 * 
 * @type {number}
 * @default
 * */
var heroTop = parsePX(hero.css("top"));

/**
 * Outer edge of hero in px
 * 
 * @type {number}
 * @default
 * */
var heroBottom = parsePX(hero.css("bottom"));

/**
 * Outer edge of hero in px
 * 
 * @type {number}
 * @default
 * */
var heroLeft = parsePX(hero.css("left"));

/**
 * Outer edge of hero in px
 * 
 * @type {number}
 * @default
 * */
var heroRight = parsePX(hero.css("right"));

/**
 * Hero life force status div for game
 * @constant
 * @type {JQuery}
 * @default
 */
const heroStatus = $("<div id=heroStatus>");


/**
 * Hero status to update progress field
 * @constant
 * @type {HTMLElement}
 * @default
 */
const heroScoreId = document.getElementById("heroStatus");


/**
 * Hero div for game
 * @type {string}
 * @default
 */
var heroName = "";

/**
 * Hero life force
 * @type {number}
 * @default
 */
var heroLifeForce = 0;

/**
 * Hero life force
 * @type {number}
 * @default
 */
var heroAttackForceStart = 0;

/**
 * Hero life force
 * @type {number}
 * @default
 */
var heroAttackForce = 0;

/**
 * Alias for id=villain getElement
 * @constant
 * @type {JQuery}
 * @default
 */
const villain = $("<div id=villain>");

/**
 * Outer edge of villain in px
 * 
 * @type {number}
 * @default
 * */
var villainTop = parsePX(villain.css("top"));
/**
 * Outer edge of villain in px
 * 
 * @type {number}
 * @default
 * */
var villainBottom = parsePX(villain.css("bottom"));

/**
 * Outer edge of villain in px
 * 
 * @type {number}
 * @default
 * */
var villainLeft = parsePX(villain.css("left"));

/**
 * Outer edge of villain in px
 * 
 * @type {number}
 * @default
 * */
var villainRight = parsePX(villain.css("right"));

/**
 * villain life force status div for game
 * @constant
 * @type {JQuery}
 * @default
 */
const villainStatus = $("<div id=villainStatus>");

/**
 * villain life status progress bar div
 * @constant
 * @type {HTMLElement}
 * @default
 */
const villainScoreId = document.getElementById("villainStatus");

/**
 * villain div for game
 * @type {string}
 * @default
 */
var villainName = "";

/**
 * villain life force
 * @type {number}
 * @default
 */
var villainLifeForce = 0;

/**
 * villain life force
 * @type {number}
 * @default
 */
var villainLifeForceStart = 0;

/**
 * villain life force
 * @type {number}
 * @default
 */
var villainAttackForce = 0;

/**
 * villain life force
 * @type {number}
 * @default
 */
var villainDeadCount = 0;

/**
 * lukeSkywalker div for game
 * @constant
 * @type {JQuery}
 * @default
 */
const lukeSkywalker = $("<div id=lukeSkywalker>");

/**
 * lukeSkywalker.jpg path
 * @constant
 * @type {string}
 * @default
 */
const lukeSkywalkerJPG = '<img src="./assets/img/lukeSkywalker.jpg" height=100% width=100%>';

/**
 * lukeSkywalker life force
 * @type {number}
 * @default
 */
var lukeSkywalkerLifeForce = Number(Math.round(Math.random() * 100 + 400));

/**
 * lukeSkywalker attack force
 * @type {number}
 * @default
 */
var lukeSkywalkerAttackForce = 30;

/**
 * Hero div for game
 * @type {JQuery}
 * @default
 */
var yoda = $("<div id=yoda>");

/**
 * Yoda.jpg path
 * @type {string}
 * @default
 */
var yodaJPG = '<img src="./assets/img/yoda.jpg" height=100% width=100%>';

/**
 * yoda life force
 * @type {number}
 * @default
 */
var yodaLifeForce = Number(Math.round(Math.random() * 150 + 350));

/**
 * yoda attack force
 * @type {number}
 * @default
 */
var yodaAttackForce = 40;

/**
 * benObiwan div for game
 * @type {JQuery}
 * @default
 */
var benObiwan = $("<div id=benObiwan>");

/**
 * Ben_Obiwan.jpg path
 * @type {string}
 * @default
 */
var benObiwanJPG = '<img src="./assets/img/benObiwan.jpg" height=100% width=100%>';

/**
 * benObiwan life force
 * @type {number}
 * @default
 */
var benObiwanLifeForce = Number(Math.round(Math.random() * 200 + 300));

/**
 * benObiwan attack force
 * @type {number}
 * @default
 */
var benObiwanAttackForce = 50;

/**
 * darthVader div for game
 * @type {JQuery}
 * @default
 */
var darthVader = $("<div id=darthVader>");

/**
 * darthVader div for game
 * @type {boolean}
 */
var darthVaderChosen = false;

/**
 * Luke_Skywalker.jpg path
 * @type {string}
 * @default
 */
var darthVaderJPG = '<img src="./assets/img/darthVader.jpg" height=100% width=100%>';

/**
 * darthVader life force
 * @type {number}
 * @default
 */
var darthVaderLifeForce = Number(Math.round(Math.random() * 100 + 400));

/**
 * darthVader attack force
 * @type {number}
 * @default
 */
var darthVaderAttackForce = 30;

/**
 * darthVader div for game
 * @type {JQuery}
 * @default
 */
var darthMaul = $("<div id=darthMaul>");

/**
 * darthVader div for game
 * @type {boolean}
 */
var darthMaulChosen = false;

/**
 * Luke_Skywalker.jpg path
 * @type {string}
 * @default
 */
var darthMaulJPG = '<img src="./assets/img/darthMaul.jpg" height=100% width=100%>';

/**
 * darthMaul life force
 * @type {number}
 * @default
 */
var darthMaulLifeForce = Number(Math.round(Math.random() * 200 + 300));

/**
 * darthMaul attack force
 * @type {number}
 * @default
 */
var darthMaulAttackForce = 40;

/**
 * darthVader div for game
 * @type {JQuery}
 * @default
 */
var darthSidious = $("<div id=darthSidious>");

/**
 * darthVader div for game
 * @type {boolean}
 */
var darthSidiousChosen = false;

/**
 * Luke_Skywalker.jpg path
 * @type {string}
 * @default
 */
var darthSidiousJPG = '<img src="./assets/img/darthSidious.jpg" height=100% width=100%>';

/**
 * darthSidious life force
 * @type {number}
 * @default
 */
var darthSidiousLifeForce = Number(Math.round(Math.random() * 150 + 350));

/**
 * darthSidious attack force
 * @type {number}
 * @default
 */
var darthSidiousAttackForce = 35;

/**
 * chosenHero div for game
 * @type {JQuery}
 * @default
 */
var chosenHero = $("<div>");

/**
 * Score for current game starts = gameStartScore 
 * @type {number}
 */
var gameScore = gameStartScore;

/**
 * Count Key strokes: user hits first key, starts music, loads user input/output divs at bottom, etc.
 * @type {number}
 */
var startCount = 0;


/**
 * gameOn or off to disable clock and score updates
 * @type {boolean}
 */
var gameOn = false;

/**
 * True once hero and villain have been chosen and ready for first keystroke to start game
 * @type {boolean}
 */
var gameReady = false;


