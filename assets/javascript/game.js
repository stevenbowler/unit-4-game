// @ts-check

$(document).ready(function () {


    /**
     * Main entrance point for the entire program
     * @function $(document).keyup
     * @param {object} e
     */
    $(document).keyup(function (e) {
        if (startCount == 0) {      // User launches game with first keystroke
            startCount++;           // After that all keystrokes move the hero div element
            playAudio();
            loadPrepGame();
            console.log(gameSpaceWidth, gameSpacePadding);
            return;
        }
        if (gameReady && !gameOn) { // if all preconditions set for gameReady then play
            gameOn = true;
            doBattle();
        }
        if (!gameOn) return;        // keys and buttons only work if gameOn, 
        switch (e.which) {

            // Move Buttons (Keyboard Down)
            case 40:
                heroMove("down", "+=50px");
                // hero.animate({ "top": "+=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Right)
            case 39:
                heroMove("right", "+=50px");
                // hero.animate({ left: "+=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Up)
            case 38:
                heroMove("up", "-=50px");
                // hero.animate({ top: "-=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Left)
            case 37:
                // hero.animate({ left: "-=50px" }, "slow");
                heroMove("left", "-=50px");
                break;

            default:
                break;
        }
    });

    // hero.effect("explode", "slow");
    // hero.css({ display: "block" });
    // animateCSS('#hero', 'zoomInLeft');{
    //  easing: 'swing',
    //  duration: 5000,
    //  complete: function(){
    //     alert('end ani');
    // }


    /**
     * Called from either buttons or up/down/left/right keys
     * @function heroMove moves hero within the playspace, based on hero 100px X 100px dimensions
     * @param {string} direction value either "up" "down" "left" "right"
     * @param {string} offsetPX  value "+=??px" or "-=??px"
     */
    const heroMove = (direction, offsetPX) => {
        var offsetNumber = parsePX(offsetPX.slice(2));
        switch (direction) { // if try to move beyond gameSpace, set the player back in gameSpace
            case "up": if (parsePX(hero.css("top")) <= 0) { hero.css("top", 0); return; } break;
            case "down": if (parsePX(hero.css("top")) + hero.height() + offsetNumber > gameSpaceHeight) { hero.css("top", gameSpaceHeight - hero.height()); return; } break;
            case "left": if (parsePX(hero.css("left")) <= 0) { hero.css("left", 0); return; } break;
            case "right": if (parsePX(hero.css("left")) + hero.width() + offsetNumber >= gameSpaceWidth) { hero.css("top", gameSpaceWidth - hero.width()); return; } break;
        }
        switch (direction) {  // otherwise move the hero
            case "up": hero.animate({ top: offsetPX }, "fast"); break;
            case "down": hero.animate({ top: offsetPX }, "fast"); break;
            case "left": hero.animate({ left: offsetPX }, "fast"); break;
            case "right": hero.animate({ left: offsetPX }, "fast"); break;
        }
    }


    /**  
     * Move Buttons do the same as the left/right/up/down keystrokes 
     * */
    $(".up-button").on("click", function () {
        heroMove("up", "-=50px");
        // hero.animate({ top: "-=50px" }, "slow");
    });
    $(".down-button").on("click", function () {
        heroMove("down", "+=50px");
        // hero.animate({ top: "+=50px" }, "slow");

    });
    $(".left-button").on("click", function () {
        heroMove("left", "-=50px");
        // hero.animate({ left: "-=50px" }, "slow");
    });
    $(".right-button").on("click", function () {
        heroMove("right", "+=50px");
        // hero.animate({ left: "+=50px" }, "slow");
    });

});


const loadPrepGame = () => {
    console.log("loadStartGame");
    heroLifeForce = 500;
    villainLifeForce = 500;
    gameStatus.css({ display: "block" });
    animateCSS("#gameClues", "zoomOutLeft", function () {
        gameClues.html(gameInstructions);
        animateCSS('#gameClues', 'zoomInLeft');
    });
    chooseHero();
    // if (heroName !== "") chooseVillain();
    // if (heroName !== "" && villainName !== "") doBattle();  // if both names are set then play the game
    // gameOn = true;
}


/**
 * Not in use yet, purpose would be to eliminate repetitive/triple/repeat code for choosing hero
 * @function testLiteral 
 * @param {JQuery} jqueryElement
 * @param {string} player
 */
const testLiteral = (jqueryElement, player) => {
    console.log(`${player}`);
    jqueryElement.addClass("heroChoice");
    jqueryElement.html('<img src="./assets/img/`${player}`.jpg" height=100% width=100%>');
    gameSpace.append(jqueryElement);
    animateCSS("#`${player}`", "zoomInRight");
    $('#`${player}`').on("click", function () {
        console.log("`${player}` chosen");
        hero.html('<img src="./assets/img/`${player}`.jpg" height=100% width=100%>');
        heroName = player;
        blankOutHeroChoice();
    });
}


/**
 * 
 * @type {object} 
 */
var testObjectChooseHero = {
    name: String,
    div: String,
    JPG: String,
    lifeForce: Number,
    attackForce: Number,
    load: function () {
        this.addClass("heroChoice");
        // lukeSkywalker.add("id", "lukeSkywalker");
        // lukeSkywalker.html(lukeSkywalkerJPG);
        this.html(this.JPG + "Life Force: " + this.lifeForce + "<br>Attack Force: " + this.attackForce);
        gameSpace.append(this.div);
        animateCSS("#lukeSkywalker", "zoomInRight");
        $('#lukeSkywalker').on("click", function () {
            console.log("lukeSkywalker chosen");
            hero.html(this.JPG);
            heroName = "Luke Skywalker";
            heroLifeForce = this.lifeForce;
            heroAttackForceStart = this.LifeForce;
            heroAttackForce = this.AttackForce;
            blankOutHeroChoice();
        });

    }

}

/**
 * Called from first keystroke after page load
 */
const chooseHero = () => {
    // testLiteral("lukeSkywalker");
    // add luke skywalker photo and onclick selection
    // lukeSkywalker.add("id", "lukeSkywalker");
    lukeSkywalker
        .css({ display: "block" })
        .addClass("heroChoice")
        .html(lukeSkywalkerJPG + "Life Force: " + lukeSkywalkerLifeForce + "<br>Attack Force: " + lukeSkywalkerAttackForce);
    // lukeSkywalker.html(lukeSkywalkerJPG);
    gameSpace.append(lukeSkywalker);
    animateCSS("#lukeSkywalker", "zoomInRight");
    $('#lukeSkywalker').on("click", function () {
        console.log("lukeSkywalker chosen");
        hero
            .html(lukeSkywalkerJPG)
            .css({ display: "block" });
        heroName = "Luke Skywalker";
        heroLifeForce = lukeSkywalkerLifeForce;
        heroAttackForceStart = lukeSkywalkerAttackForce;
        heroAttackForce = lukeSkywalkerAttackForce;
        blankOutHeroChoice();
    });

    // add yoda photo and onclick selection
    yoda
        .css({ display: "block" })
        .addClass("heroChoice")
        .html(yodaJPG + "Life Force: " + yodaLifeForce + "<br>Attack Force: " + yodaAttackForce);
    gameSpace.append(yoda);
    animateCSS("#yoda", "zoomInRight");
    $('#yoda').on("click", function () {
        console.log("yoda chosen");
        hero
            .html(yodaJPG)
            .css({ display: "block" });
        heroName = "Yoda";
        heroLifeForce = yodaLifeForce;
        heroAttackForceStart = yodaAttackForce;
        heroAttackForce = yodaAttackForce;
        blankOutHeroChoice();
    });

    // add benObiwan photo and onclick selection
    benObiwan
        .css({ display: "block" })
        .addClass("heroChoice")
        .html(benObiwanJPG + "Life Force: " + benObiwanLifeForce + "<br>Attack Force: " + benObiwanAttackForce);
    gameSpace.append(benObiwan);
    animateCSS("#benObiwan", "zoomInRight");
    $('#benObiwan').on("click", function () {
        console.log("benObiwan chosen");
        hero
            .html(benObiwanJPG)
            .css({ display: "block" });
        heroName = "Ben Obiwan";
        heroLifeForce = benObiwanLifeForce;
        heroAttackForceStart = benObiwanAttackForce;
        heroAttackForce = benObiwanAttackForce;
        blankOutHeroChoice();
    });

}


const blankOutHeroChoice = () => {
    animateCSS("#lukeSkywalker", "zoomOutRight", function () {
        lukeSkywalker.empty();
        lukeSkywalker.css({ display: "none" });
    });

    animateCSS("#yoda", "zoomOutRight", function () {
        yoda.empty();
        yoda.css({ display: "none" });
    });
    animateCSS("#benObiwan", "zoomOutRight", function () {
        benObiwan.empty();
        benObiwan.css({ display: "none" });
    });

    hero.removeClass("heroChoice");
    hero.addClass("hero");
    // hero.html(lukeSkywalkerJPG);
    // hero.html(lukeSkywalkerJPG);
    gameSpace.append(hero);
    chooseVillain();

}





//hero.effect("explode", "slow"); //works
// hero.css({ display: "block" });
//$(".hero").effect("explode", "slow"); //works


const chooseVillain = () => {
    //if (heroName === "") return;  // if hero not chosen yet return
    console.log("chooseVillain");

    if (!darthMaulChosen) {
        darthMaul.addClass("villainChoice");
        darthMaul.css({ display: "inline" });
        // darthMaul.add("id", "darthMaul");
        darthMaul.html(darthMaulJPG + "Life Force: " + darthMaulLifeForce + "<br>Attack Force: " + darthMaulAttackForce);
        gameSpace.append(darthMaul);
        animateCSS("#darthMaul", "zoomInRight");
        $('#darthMaul').on("click", function () {
            console.log("darthMaul chosen");
            villain.html(darthMaulJPG);
            villainName = "Darth Maul";
            villainLifeForce = darthMaulLifeForce;
            villainLifeForceStart = darthMaulLifeForce;
            villainAttackForce = darthMaulAttackForce;
            blankOutVillainChoice();
            darthMaulChosen = true;
        });
    }

    if (!darthSidiousChosen) {
        // add darthVader photo and onclick selection
        darthSidious.addClass("villainChoice");
        darthSidious.css({ display: "inline" });
        // darthSidious.add("id", "darthSidious");
        darthSidious.html(darthSidiousJPG + "Life Force: " + darthSidiousLifeForce + "<br>Attack Force: " + darthSidiousAttackForce);
        // darthSidious.html(darthSidiousJPG);
        gameSpace.append(darthSidious);
        animateCSS("#darthSidious", "zoomInRight");
        $('#darthSidious').on("click", function () {
            console.log("darthSidious chosen");
            villain.html(darthSidiousJPG);
            villainName = "Darth Sidious";
            villainLifeForce = darthSidiousLifeForce;
            villainLifeForceStart = darthSidiousLifeForce;
            villainAttackForce = darthSidiousAttackForce;
            blankOutVillainChoice();
            darthSidiousChosen = true;
        });
    }

    if (!darthVaderChosen) {
        // add darthVader photo and onclick selection
        darthVader.addClass("villainChoice");
        darthVader.css({ display: "inline" });
        // darthVader.add("id", "darthVader");
        // darthVader.html(darthVaderJPG);
        darthVader.html(darthVaderJPG + "Life Force: " + darthVaderLifeForce + "<br>Attack Force: " + darthVaderAttackForce);
        gameSpace.append(darthVader);
        animateCSS("#darthVader", "zoomInRight");
        $('#darthVader').on("click", function () {
            console.log("darthVader chosen");
            villain.html(darthVaderJPG);
            villainName = "Darth Vader";
            villainLifeForce = darthVaderLifeForce;
            villainLifeForceStart = darthVaderLifeForce;
            villainAttackForce = darthVaderAttackForce;
            blankOutVillainChoice();
            darthVaderChosen = true;
        });
    }
}


const blankOutVillainChoice = () => {
    if (!darthMaulChosen) {
        animateCSS("#darthMaul", "zoomOutRight", function () {
            darthMaul.empty();
            darthMaul.css({ display: "none" });
        });
    }

    if (!darthSidiousChosen) {
        animateCSS("#darthSidious", "zoomOutRight", function () {
            darthSidious.empty();
            darthSidious.css({ display: "none" });
        });
    }
    if (!darthVaderChosen) {
        animateCSS("#darthVader", "zoomOutRight", function () {
            darthVader.empty();
            darthVader.css({ display: "none" });
        });
    }

    villain.removeClass("villainChoice");
    if (villainDeadCount == 0) {
        villain.addClass("villain");
        gameSpace.append(villain);
    }
    villain.css("top", "0px");
    villain.css("left", (gameSpaceWidth - villain.width()) + "px");
    villain.css({ display: "inline" });
    gameReady = true;
}

const doBattle = () => {
    console.log("doBattle");
    updateScoreBoard();
    setBattleBackGround();
    relocateVillain();
    resetGameVariables();
    startGameTimer();
}

const setBattleBackGround = () => {
    console.log("changeBackGround");
    if (villainDeadCount >= 1) return;  // don't reset music and background between villain rounds (if game in progress)
    gameSpace.css({
        background: "url(../unit-4-game/assets/img/sunSet.gif) no-repeat",
        backgroundSize: "100% 100%"
    });
    gameAudio.src = "./assets/audio/DuellingFates.mp3";
    playAudio();
}


/**
 * called from doBattle at end of each round
 * @function resetGameVariables
 */
const resetGameVariables = () => {
    console.log("resetGameVariables");
    updateScoreBoard();
}


/** 
* @type {*}
*/
var timerID = "";

/**
 * set game timer calls handleMoves to react to current conditions/coordinates of hero and villain
 * @function startGameTimer
 */
const startGameTimer = () => {
    console.log("startGameTimer");
    timerID = setInterval(
        () => handleMoves(),
        1000);
}

/**
 * called from end??? to turn off game timer when each round of the game
 * @function stopGameTimer
 */
const stopGameTimer = () => {
    clearInterval(timerID);
}

/**
 * Each time there is a move need to check if contact, 
 *     then update scores and game status: win, lose, stillOn relocateVillain.
 * @function handleMoves
 */
const handleMoves = () => {
    if (gameOn && gameReady) {
        if (contact()) { console.log("contact: ", contact()); onContact(); }
    }
}


/**
 * called from game timer, update life forces, updateScoreBoard
 * @function onContact
 * 
 */
const onContact = () => {
    villainLifeForce = villainLifeForce - heroAttackForce;
    if (villainLifeForce <= 0) { stopGameTimer(); homeHero(); endVillain(); }
    else relocateVillain();
    heroLifeForce = heroLifeForce - villainAttackForce;
    if (heroLifeForce <= 0) { stopGameTimer(); endHero(); }
    heroAttackForce = heroAttackForce + heroAttackForceStart;
    updateScoreBoard();
}


/**
 * determines if there was contact between hero and villain
 * @function contact
 * @returns {boolean}
 */
const contact = () => {
    refreshHeroVillainCoordinates();
    // console.log("heroRight: ", heroRight, "villainLeft:", villainLeft);
    // console.log("villainBottom: ", villainBottom, "heroTop:", heroTop);
    if ((heroTop <= villainBottom && heroTop >= villainTop && heroRight >= villainLeft && heroRight <= villainRight) ||
        (heroTop <= villainBottom && heroTop >= villainTop && heroLeft <= villainRight && heroLeft >= villainLeft) ||
        (heroBottom >= villainTop && heroBottom <= villainBottom && heroRight >= villainLeft && heroRight <= villainRight) ||
        (heroBottom >= villainTop && heroBottom <= villainBottom && heroLeft <= villainRight && heroLeft >= villainLeft))
        return true;
    else return false;
}


/**
 * Called from contact boolean function to set latest positions of hero and villain for contact/overlap condition
 * @function refreshHeroVillainCoordinates
 */
const refreshHeroVillainCoordinates = () => {
    heroTop = parsePX(hero.css("top"));
    heroBottom = parsePX(hero.css("top")) + hero.height();
    heroLeft = parsePX(hero.css("left"));
    heroRight = parsePX(hero.css("left")) + hero.width();
    villainTop = parsePX(villain.css("top"));
    villainBottom = parsePX(villain.css("top")) + villain.height();
    villainLeft = parsePX(villain.css("left"));
    villainRight = parsePX(villain.css("left")) + villain.width();
}


/**
 * update the hero & villain progress bars
 * @function updateScoreBoard
 */
const updateScoreBoard = () => {
    // console.log("heroLifeForce: ", heroLifeForce);
    // console.log("heroLifeForce.toString:  ", Math.round(heroLifeForce / 5).toString());
    heroScoreId.innerHTML = heroLifeForce.toString();
    heroScoreId.style.width = Math.round(heroLifeForce / 5).toString() + "%";
    villainScoreId.innerHTML = villainLifeForce.toString();
    villainScoreId.style.width = Math.round(villainLifeForce / 5).toString() + "%";
}


/** 
 * Sends hero to home position while selecting next villain called from onContact when villainLifeForce < 0
 * @function homeHero
 * */
const homeHero = () => {
    hero.css("top", "0px");
    hero.css("left", "0px");
}


/**
 * called from onContact when villainLifeForce <= 0
 * @function endVillain
 */
const endVillain = () => {
    homeHero();
    villain.effect("explode", "slow");
    villain.empty();
    ++villainDeadCount;
    if (villainDeadCount == 3) endGame();    // if all villains dead, end game
    else pickNextVillain();                 //  else pick next villain
}


/**
 * called from endVillain when at least one of the 3 villains has not been terminated yet
 * @function pickNextVillain
 */
const pickNextVillain = () => {
    console.log("pickNextVillain ");
    chooseVillain();
    doBattle();
}


/**  random number from 16 to 59     
 * called from startGame or pickNextVillain or onContact when villain hit by hero
 * @function relocateVillain
 */
const relocateVillain = () => {
    console.log("relocateVillain");
    topPosition = Math.round(Math.random() * (gameSpaceHeight - villain.height())) + "px";
    leftPosition = Math.round(Math.random() * (gameSpaceWidth - villain.width())) + "px";
    console.log("topPosition ", topPosition, "leftPosition", leftPosition);
    villain.css("top", topPosition);
    villain.css("left", leftPosition);
}

/**
 * Called from onContact when hero life force <= 0 or when 3rd villain lifeForce <= 0
 */
const endHero = () => {
    console.log("endHero");
    endGame();
}


/**
 * called from either endVillain or endHero to end the game
 * @function endGame
 */
const endGame = () => {
    console.log("endGame   Hero LifeForce: ", heroLifeForce);
    startCount = 0;
    gameOn = false;
    gameReady = false;
    hero.css({ display: "none" });
    villain.css({ display: "none" });
    hero.empty();
    villain.empty();
    darthMaulChosen = false;
    darthVaderChosen = false;
    darthSidiousChosen = false;
    villainDeadCount = 0;
    if (heroLifeForce > 0) universeSaved();
    else allIsLost();
}


/**
 * End of game when hero wins, called from endGame
 * @function universeSaved
 */
const universeSaved = () => {
    console.log("universeSaved");
    gameSpace.css({
        background: "url(../unit-4-game/assets/img/lonelySpace.gif) no-repeat",
        backgroundSize: "100% 100%"
    });

    animateCSS("#gameStatus", "zoomOutLeft");
    gameStatus.css({ display: "none" });
    animateCSS("#gameClues", "zoomOutLeft", function () {
        gameClues.html(universeSavedInstruction);
        animateCSS('#gameClues', 'zoomInLeft');
    });

    gameAudio.src = "./assets/audio/AnakinsSymphony.mp3";
    playAudio();
}


/**
 * End of game when villain wins, called from endVillain endGame
 * @function allIsLost
 */
const allIsLost = () => {
    console.log("allIsLost");
    gameSpace.css({
        background: "url(../unit-4-game/assets/img/sun.gif) no-repeat",
        backgroundSize: "100% 100%"
    });

    animateCSS("#gameStatus", "zoomOutLeft");
    gameStatus.css({ display: "none" });
    animateCSS("#gameClues", "zoomOutLeft", function () {
        gameClues.html(allIsLostInstruction);
        animateCSS('#gameClues', 'zoomInLeft');
    });

    gameAudio.src = "./assets/audio/Evil.mp3";
    playAudio();
}



/** 
 * Called from restart() or from play music button on home screen
 * @function playAudio
 */
const playAudio = () => {
    gameAudio.play();
}

/** 
 * Called from pause music button on home screen
 * @function pauseAudio
 */
const pauseAudio = () => {
    gameAudio.pause();
}

/**
 * Funtioning video call to youtube, utility function, offers youtube video in id=??? div on home screen
 */
// const playVideo = () => {
//     composerClues.innerHTML = gameComposerVideo;
//     animateCSS('#composerClues', 'zoomInRight');
// }

/**
 * Called from various points to animate unload load of content in divs,
 *      from GitHub animate.css library
 * @async
 * @function animateCSS
 * @param {*} element div id/class/tag to be modified
 * @param {*} animationName from list of animateCSS classes
 * @param {*} [callback] required if unloading before loading div with content, async
 */
const animateCSS = (element, animationName, callback) => {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
