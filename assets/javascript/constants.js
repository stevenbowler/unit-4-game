// @ts-check
//const lukeSkywalker = $("<div id=lukeSkywalker>");
/**
 * THIS IS STILL A TEST OF OOP, SET A CLASS TO ELIMINATE REPETITION IN {@link chooseHero}
 * later will be applied to {@link chooseVillain}
 * @class WarriorHero
 * @function constructor
 * @param {JQuery} selector
 */
class WarriorHero {
    constructor(name, div, jpg, lifeForce, attackForce) {
        this.name = name;
        this.div = div;
        this.jpg = jpg;
        this.lifeForce = lifeForce;
        this.attackForce = attackForce;
        this.selector = $("<div id=" + this.name + ">");
    }

    display() {
        this.selector
            .css({ display: "block" })
            .addClass("heroChoice")
            .html(lukeSkywalkerJPG + "Life Force: " + lukeSkywalkerLifeForce + "<br>Attack Force: " + lukeSkywalkerAttackForce);
        // lukeSkywalker.html(lukeSkywalkerJPG);
        gameSpace.append(this.selector);
        animateCSS("#lukeSkywalker", "zoomInRight");
        this.selector.on("click", function () {
            console.log(this.name + " chosen");
            hero
                .html(this.jpg)
                .css({ display: "block" });
            heroName = this.name;
            heroLifeForce = this.lifeForce;
            heroAttackForceStart = this.attackForce;
            heroAttackForce = this.attackForce;
            blankOutVillainChoice();
        });
    }
}


/**
 * @const lukeSkywalkerObj
 * @type {object}
 */
const lukeSkywalkerObj = new WarriorHero({
    name: "lukeSkywalker",
    div: "<div id='hero'>",
    jpg: '<img src="./assets/img/lukeSkywalker.jpg" height=100% width=100%>',
    lifeForce: Number(Math.round(Math.random() * 100 + 400)),
    attackForce: 30
});


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
    "so choose wisely, and learn.  Attack using arrow keys or buttons." +
    "<br><strong>Keep positive life force (Health Points, HP) and live.</strong>" +
    "<br><br><strong>Hit any key to continue once you have read the instructions above.</strong>";

/**
 * User instructions to display after hero wins called from {@link endGame}
 * @constant
 * @type {string}
 * @default
 */
const universeSavedInstruction =
    "Thank you for saving this universe.  " +
    "<strong>Hit any key to save this or any other universe. </strong> ";

/**
 * User instructions to display after hero loses called from {@link endGame}
 * @constant
 * @type {string}
 * @default
 */
const allIsLostInstruction =
    "This universe has been lost forever. " +
    "<strong>Hit any key to try and save another universe.  </strong>";

/**
 * User instructions when selecting hero from {@link chooseHero}
 * @constant
 * @type {string}
 * @default
 */
const chooseHeroInstructions =
    "Choose one of the these characters as your hero alter-ego.  ";

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
 * Alias for id=gameSpace JQuery Selector
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
 * game is played within this height
 * @constant
 * @type {number}
 * @default
 */
const gameSpaceHeight = gameSpace.height();

/**
 * Used in {@link relocateVillain} for random reset of villain position after contact
 * @type {string}
 */
var topPosition = "";

/**
 * Used in {@link relocateVillain} for random reset of villain position after contact
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
 * Alias for id=hero JQuery selector
 * @constant
 * @type {JQuery}
 * @default
 */
// const hero = $("#hero");


/**
 * Alias for id=gameClues getElement
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
 * Alias for id=gameScore on test out string literals, {@link updateScoreBoard}
 *      used for updating heroAttackForce as it increases thru the game
 * @constant
 * @type {JQuery}
 * @default
 */
const heroStatusLabel = $("#heroStatusLabel");

/**
 * Alias for id=heroStatusLabel on test out string literals
 * 
 * @type {string}
 * @default
 */
var heroStatusLabelContent = "Hero Life Force below, Attack force" + `${gameOn ? heroAttackForce : ''}`;

/**
 * Alias for id=gameAudio getElement
 * @constant
 * @type {JQuery}
 * @default
 */
const gameAudio = document.getElementById("gameAudio");
//const gameAudio = $("#gameAudio");

/**
 * Hero div for game alias for JQuery Selector
 * @type {JQuery}
 * @default
 */
const hero = $("<div id='hero'>");
/**<div class="b2" data-target="true" style="animation: 1000ms linear 0s 1 normal both running scale-easeInBounce;">That function</div> */

/**
 * Outer edge of hero in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var heroTop = parsePX(hero.css("top"));

/**
 * Outer edge of hero in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var heroBottom = parsePX(hero.css("bottom"));

/**
 * Outer edge of hero in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var heroLeft = parsePX(hero.css("left"));

/**
 * Outer edge of hero in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var heroRight = parsePX(hero.css("right"));

/**
 * Hero life force status div for game progress bar 
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
 * Hero name div for game, currently not used
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
 * Outer edge of villain in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var villainTop = parsePX(villain.css("top"));
/**
 * Outer edge of villain in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var villainBottom = parsePX(villain.css("bottom"));

/**
 * Outer edge of villain in px {@link contact}
 * 
 * @type {number}
 * @default
 * */
var villainLeft = parsePX(villain.css("left"));

/**
 * Outer edge of villain in px {@link contact}
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
 * villain life force start
 * @type {number}
 * @default
 */
var villainLifeForceStart = 0;

/**
 * villain attack force
 * @type {number}
 * @default
 */
var villainAttackForce = 0;

/**
 * villain Dead Count called from {@link onContact} at >=3 calls {@link endVillain}
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
 * darthVader div for game {@link endGame}
 * @type {number}
 */
var darthVaderCounter = 0;

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
var darthVaderAttackForce = 45;

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
 * darthMaul used to count to end async calls to chooseVillain {@link endGame}
 * @type {number}
 */
var darthMaulCounter = 0;

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
var darthMaulAttackForce = 55;

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
 * darthSidious div for game {@link endGame}
 * @type {number}
 */
var darthSidiousCounter = 0;

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
var darthSidiousAttackForce = 50;

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



