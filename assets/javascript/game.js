// @ts-check

$(document).ready(function () {

    /**
     * Marker for program top, 1st keystroke calls {@link preGame}, 2nd keystroke calls {@link doBattle}, then all call {@link heroMove}
     * @function top
     */
    const top = () => { }

    /**
     * test for phones, first touch enters program
     */
    $("#gameSpace").on("touchstart", function () {
        playAudio();
    });

    /**
     * Main entrance point for the entire program
     * @function  $(document).keyup
     * @param {object} e event object for keyup events, main driver for program
     */
    $(document).keyup(function (e) {
        if (startCount == 0) {      // User launches game with first keystroke
            startCount++;           // After that all keystrokes move the hero div element
            gameAudio.src = "./assets/audio/StarWarsTheme.mp3";
            playAudio();
            preGame();
            updateScoreBoard();
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
                heroMove("down", "+=100px");
                // hero.animate({ "top": "+=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Right)
            case 39:
                heroMove("right", "+=300px");
                // hero.animate({ left: "+=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Up)
            case 38:
                heroMove("up", "-=100px");
                // hero.animate({ top: "-=50px" }, "slow");
                break;

            // Move Buttons (Keyboard Left)
            case 37:
                // hero.animate({ left: "-=50px" }, "slow");
                heroMove("left", "-=300px");
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
        console.log("offsetNumber: ", offsetNumber);
        console.log("heroTop: ", hero.css("top"));
        console.log("heroLeft: ", hero.css("left"));
        var halfOffSetPX = "+" + Number(offsetNumber / 2).toString() + "px";
        switch (direction) { // if try to move beyond gameSpace, set the player back in gameSpace
            case "up": if (parsePX(hero.css("top")) <= 0) { hero.css("top", 0); return; } break;
            case "down": if (parsePX(hero.css("top")) + hero.height() + offsetNumber > gameSpaceHeight) { hero.css("top", gameSpaceHeight - hero.height()); return; } break;
            case "left": if (parsePX(hero.css("left")) <= 0) { hero.css("left", 0); return; } break;
            case "right": if (parsePX(hero.css("left")) + hero.width() + offsetNumber >= gameSpaceWidth) { hero.animate({ left: (gameSpaceWidth - hero.width()).toString() + "px" }); return; } break;
            // case "right": if (parsePX(hero.css("left")) + hero.width() + offsetNumber >= gameSpaceWidth) { hero.css("left", gameSpaceWidth - hero.width()); return; } break;
        }
        switch (direction) {  // otherwise move the hero
            case "up": {
                hero.animate({ top: offsetPX }, 200, "linear"); break;
            }
            case "down": {
                hero.animate({ top: offsetPX }, 200, "linear"); break;
            }
            case "left": {
                // hero.css("animation", "1000ms linear 0s 1 normal both running scale-easeInBounceLeft");  // animation trials without jquery easing
                // hero.animate({ left: "-" + halfOffSetPX });
                // hero.css("animation", "1000ms linear 0s 1 normal both running");
                // break;
                hero.animate({ left: (parsePX(hero.css("left")) - offsetNumber).toString() + "px" }, 600, "linear"); break;
            }
            case "right": {
                hero.animate({ left: (parsePX(hero.css("left")) + offsetNumber).toString() + "px" }, 600, "linear"); break;
            }
        }
    }

    // $("p").animate({
    //     opacity: "show"
    // }, {
    //     duration: "slow",
    //     easing: "easein"
    // });

    // below worked locally, not on GitHub
    // case "left": {
    //     hero.animate({ left: offsetPX }, {
    //         duration: 1000,
    //         specialEasing: {
    //             left: "easeOutBounce"
    //         }
    //     }); break;
    // }

    /**  
     * Move Buttons do the same as the left/right/up/down keystrokes 
     * */
    $(".up-button").on("click", function () {
        heroMove("up", "-=100px");
        // hero.animate({ top: "-=50px" }, "slow");
    });
    $(".down-button").on("click", function () {
        heroMove("down", "+=100px");
        // hero.animate({ top: "+=50px" }, "slow");

    });
    $(".left-button").on("click", function () {
        heroMove("left", "-=300px");
        // hero.animate({ left: "-=50px" }, "slow");
    });
    $(".right-button").on("click", function () {
        heroMove("right", "+=300px");
        // hero.animate({ left: "+=50px" }, "slow");
    });

    // });

    /**
     * Called from document.onkeyup on first keystroke {@link top}
     * @function preGame
     */
    const preGame = () => {
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
     * This is just another failed test of OOP
     * @type {object}
     */
    // var testObjectChooseHero = {
    //     name: String,
    //     div: String,
    //     JPG: String,
    //     lifeForce: Number,
    //     attackForce: Number,
    //     load: function () {
    //         this.addClass("heroChoice");
    //         // lukeSkywalker.add("id", "lukeSkywalker");
    //         // lukeSkywalker.html(lukeSkywalkerJPG);
    //         this.html(this.JPG + "Life Force: " + this.lifeForce + "<br>Attack Force: " + this.attackForce);
    //         gameSpace.append(this.div);
    //         animateCSS("#lukeSkywalker", "zoomInRight");
    //         $('#lukeSkywalker').on("click", function () {
    //             console.log("lukeSkywalker chosen");
    //             hero.html(this.JPG);
    //             heroName = "Luke Skywalker";
    //             heroLifeForce = this.lifeForce;
    //             heroAttackForceStart = this.LifeForce;
    //             heroAttackForce = this.AttackForce;
    //             blankOutHeroChoice();
    //         });

    //     }

    // }

    /**
     * Called from {@link preGame}, displays 3 hero images with onClick to choose hero, then {@link blankOutHeroChoice}
     * @function chooseHero
     */
    const chooseHero = () => {

        //   lukeSkywalkerObj.display();   // will require WarriorHero class working can't get selector working

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
                .css({ top: "0px" })
                .css({ left: "0px" })
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
                .css({ top: "0px" })
                .css({ left: "0px" })
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
                .css({ top: "0px" })
                .css({ left: "0px" })
                .css({ display: "block" });
            heroName = "Ben Obiwan";
            heroLifeForce = benObiwanLifeForce;
            heroAttackForceStart = benObiwanAttackForce;
            heroAttackForce = benObiwanAttackForce;
            blankOutHeroChoice();
        });

    }

    /**
     * Called from {@link chooseHero} removes hero images from display, then calls {@link chooseVillain}
     * @function blankOutHeroChoice
     */
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
        // homeHero();
        chooseVillain();

    }





    //hero.effect("explode", "slow"); //works
    // hero.css({ display: "block" });
    //$(".hero").effect("explode", "slow"); //works

    /**
     * Called from {@link blankOutHeroChoice}, display villain choices, select villain if not previously chosen, 
     *      then {@link blankOutVillainChoice}
     * @function chooseVillain
     */
    const chooseVillain = () => {
        //if (heroName === "") return;  // if hero not chosen yet return
        console.log("chooseVillain", "villainDeadCount: ", villainDeadCount, "darthVaderChosen: ", darthVader);
        //if (villainDeadCount == 0) { darthMaulChosen = false; darthSidiousChosen = false; darthVaderChosen = false }

        if (!darthMaulChosen && darthMaulCounter === 0) {
            darthMaul.addClass("villainChoice");
            darthMaul.css({ display: "inline" });
            // darthMaul.add("id", "darthMaul");
            darthMaul.html(darthMaulJPG + "Life Force: " + darthMaulLifeForce + "<br>Attack Force: " + darthMaulAttackForce);
            gameSpace.append(darthMaul);
            animateCSS("#darthMaul", "zoomInRight", function () {
                $('#darthMaul').on("click", function () {
                    console.log("darthMaul chosen");
                    villain.html(darthMaulJPG);
                    villainName = "Darth Maul";
                    villainLifeForce = darthMaulLifeForce;
                    villainLifeForceStart = darthMaulLifeForce;
                    villainAttackForce = darthMaulAttackForce;
                    blankOutVillainChoice();
                    // animateCSS("#darthMaul", "zoomOutRight", function () {
                    //     darthMaul
                    //         .empty()
                    //         .css({ display: "none" })
                    //         .removeClass("villainChoice");
                    // });
                    darthMaulChosen = true;
                    ++darthMaulCounter;
                });
            });

        }

        if (!darthSidiousChosen && darthSidiousCounter === 0) {
            // add darthVader photo and onclick selection
            darthSidious.addClass("villainChoice");
            darthSidious.css({ display: "inline" });
            // darthSidious.add("id", "darthSidious");
            darthSidious.html(darthSidiousJPG + "Life Force: " + darthSidiousLifeForce + "<br>Attack Force: " + darthSidiousAttackForce);
            // darthSidious.html(darthSidiousJPG);
            gameSpace.append(darthSidious);
            animateCSS("#darthSidious", "zoomInRight", function () {
                $('#darthSidious').on("click", function () {
                    console.log("darthSidious chosen");
                    villain.html(darthSidiousJPG);
                    villainName = "Darth Sidious";
                    villainLifeForce = darthSidiousLifeForce;
                    villainLifeForceStart = darthSidiousLifeForce;
                    villainAttackForce = darthSidiousAttackForce;
                    blankOutVillainChoice();
                    // animateCSS("#darthSidious", "zoomOutRight", function () {
                    //     darthSidious
                    //         .empty()
                    //         .css({ display: "none" })
                    //         .removeClass("villainChoice");
                    // });
                    darthSidiousChosen = true;
                    ++darthSidiousCounter;
                });
            });

        }

        if (!darthVaderChosen && darthVaderCounter === 0) {
            // add darthVader photo and onclick selection
            darthVader.addClass("villainChoice");
            darthVader.css({ display: "inline" });
            // darthVader.add("id", "darthVader");
            // darthVader.html(darthVaderJPG);
            darthVader.html(darthVaderJPG + "Life Force: " + darthVaderLifeForce + "<br>Attack Force: " + darthVaderAttackForce);
            gameSpace.append(darthVader);
            animateCSS("#darthVader", "zoomInRight", function () {
                $('#darthVader').on("click", function () {
                    console.log("darthVader chosen");
                    villain.html(darthVaderJPG);
                    villainName = "Darth Vader";
                    villainLifeForce = darthVaderLifeForce;
                    villainLifeForceStart = darthVaderLifeForce;
                    villainAttackForce = darthVaderAttackForce;
                    blankOutVillainChoice();
                    // animateCSS("#darthVader", "zoomOutRight", function () {
                    //     darthVader
                    //         .empty()
                    //         .css({ display: "none" })
                    //         .removeClass("villainChoice");
                    // });
                    darthVaderChosen = true;
                    ++darthVaderCounter;
                });
            });

        }
    }

    /**
     * Called from {@link chooseVillain}, remove all villains displayed, set {@link gameReady} = true
     */
    const blankOutVillainChoice = () => {
        if (!darthMaulChosen) {
            animateCSS("#darthMaul", "zoomOutRight", function () {
                darthMaul
                    .empty()
                    .css({ display: "none" });
                // .removeClass("villainChoice");
            });
        }

        if (!darthSidiousChosen) {
            animateCSS("#darthSidious", "zoomOutRight", function () {
                darthSidious
                    .empty()
                    .css({ display: "none" });
                // .removeClass("villainChoice");
            });
        }
        if (!darthVaderChosen) {
            animateCSS("#darthVader", "zoomOutRight", function () {
                darthVader
                    .empty()
                    .css({ display: "none" });
                // .removeClass("villainChoice");
            });
        }

        villain.removeClass("villainChoice");
        if (villainDeadCount == 0) {
            villain.addClass("villain");
            gameSpace.append(villain);
        }
        villain
            .css("top", "0px")
            .css("left", (gameSpaceWidth - villain.width()) + "px")
            .css({ display: "inline" });
        updateScoreBoard();
        gameReady = true;
    }


    /**
     * called from {@link top} main key event from game load and ready or from {@link pickNextVillain} for each next round
     * @function doBattle
     */
    const doBattle = () => {
        console.log("doBattle");
        updateScoreBoard();
        setBattleBackGround("sunSet");
        relocateVillain();
        resetGameVariables();
        startGameTimer();
    }

    // animateCSS("#gameClues", "zoomOutLeft", function () {
    //     gameSpace.css({
    //         background: "url(../unit-4-game/assets/img/" + imageText + ".gif) no-repeat",
    //         backgroundSize: "100% 100%"
    //     });
    //     animateCSS('#gameClues', 'zoomInLeft');
    // });


    /**
     * called from various points in program to reset the background image
     * @function setBattleBackGround
     * @param {string} imageText
     */
    const setBattleBackGround = (imageText) => {
        console.log("changeBackGround", "imageText: ", imageText);
        if (villainDeadCount >= 1) return;  // don't reset music and background between villain rounds (if game in progress)
        if (imageText == "") imageText = "space";
        // animateCSS("#gameSpace", "zoomOutLeft", function () {
        gameSpace.css({
            background: "url(../unit-4-game/assets/img/" + imageText + ".gif) no-repeat",
            backgroundSize: "100% 100%"
        });
        //     animateCSS('#gameSpace', 'zoomInLeft');
        // });
        gameAudio.src = "./assets/audio/DuellingFates.mp3";
        playAudio();
    }


    /**
     * called from {@link doBattle} at end of each round
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
     * Called from {@link doBattle} to set game timer then calls {@link handleMoves} to react to current conditions/coordinates of hero and villain
     * @function startGameTimer
     */
    const startGameTimer = () => {
        console.log("startGameTimer");
        timerID = setInterval(
            () => handleMoves(),
            250);
    }

    /**
     * called from {@link onContact} if either {@link heroLifeForce} or {@link villainLifeForce} < 0 
     *      turn off game timer when each round of the game
     * @function stopGameTimer
    */
    const stopGameTimer = () => {
        clearInterval(timerID);
    }

    /**
     * Called from {@link startGameTimer} Each time there is a move need to check if contact, 
     *     then update scores and game status: win, lose, gameOn still then relocateVillain.
     * @function handleMoves
     */
    const handleMoves = () => {
        if (gameOn && gameReady) {
            if (contact()) { console.log("contact: ", contact()); onContact(); }
        }
    }


    /**
     * called from {@link handleMoves} game timer, update life forces, updateScoreBoard
     * @function onContact
     */
    const onContact = () => {
        villainLifeForce = villainLifeForce - heroAttackForce;
        heroLifeForce = heroLifeForce - villainAttackForce;
        if (villainLifeForce <= 0 && heroLifeForce > 0) { stopGameTimer(); homeHero(); endVillain(); }
        else relocateVillain();
        if (heroLifeForce <= 0) { stopGameTimer(); endHero(); }
        heroAttackForce = heroAttackForce + heroAttackForceStart;
        updateScoreBoard();
    }


    /**
     * determines if there was contact between hero and villain, called from {@link onContact}
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
     * Called from {@link contact} boolean function to set latest positions of hero and villain for contact/overlap condition
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
     * update the hero & villain progress bars, 
     * called from {@link onContact} {@link resetGameVariables} {@link blankOutVillain} {@link doBattle}
     * @function updateScoreBoard
     */
    const updateScoreBoard = () => {
        // console.log("heroLifeForce: ", heroLifeForce);
        // console.log("heroLifeForce.toString:  ", Math.round(heroLifeForce / 5).toString());
        heroScoreId.innerHTML = heroLifeForce.toString();
        heroScoreId.style.width = Math.round(heroLifeForce / 5).toString() + "%";
        villainScoreId.innerHTML = villainLifeForce.toString();
        villainScoreId.style.width = Math.round(villainLifeForce / 5).toString() + "%";
        heroStatusLabelContent = "Hero Life Force " + `${gameOn ? 'below, Attack force: ' : ''}` + `${gameOn ? heroAttackForce : ''}`;
        heroStatusLabel.html(heroStatusLabelContent);
    }


    /** 
     * Sends hero to home position while selecting next villain called from {@link onContact} when villainLifeForce < 0
     * @function homeHero
     * */
    const homeHero = () => {
        animateCSS("#hero", "zoomOutLeft");
        hero.css({ top: "0px" });
        hero.css({ left: "0px" });
    }


    /**
     * called from {@link onContact} when villainLifeForce <= 0
     * @function endVillain
     */
    const endVillain = () => {
        homeHero();
        animateCSS("#villain", "zoomOutLeft");
        //        villain.effect("explode", "slow");
        villain.empty();
        ++villainDeadCount;
        if (villainDeadCount == 3) endGame();    // if all villains dead, end game
        else pickNextVillain();                 //  else pick next villain
    }


    /**
     * called from {@link endVillain} when at least one of the 3 villains has not been terminated yet
     * @function pickNextVillain
     */
    const pickNextVillain = () => {
        console.log("pickNextVillain ");
        chooseVillain();
        doBattle();
    }


    /**  random number from 16 to 59     
     * called from {@link startGame} or {@link pickNextVillain} or {@link onContact} when villain hit by hero
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
     * Called from {@link onContact} when hero life force <= 0 or when 3rd villain lifeForce <= 0
     */
    const endHero = () => {
        console.log("endHero");
        villain.css({ display: "none" });
        endGame();
    }


    /**
     * called from either {@link endVillain} or {@link endHero} to end the game
     * @function endGame
     */
    const endGame = () => {
        console.log("endGame   Hero LifeForce: ", heroLifeForce);
        startCount = 0;
        gameOn = false;
        gameReady = false;
        hero.css({ display: "none" });
        villain.css({ display: "none" });
        if (villainDeadCount < 3) blankOutVillainChoice(); // when only 2 or 1 villains requred to win 
        hero.empty();
        villain.empty();
        darthMaulChosen = false;
        darthVaderChosen = false;
        darthSidiousChosen = false;
        darthMaulCounter = 0;
        darthSidiousCounter = 0;
        darthVaderCounter = 0;
        villainDeadCount = 0;
        if (heroLifeForce > 0) universeSaved();
        else allIsLost();
    }


    /**
     * Called from {@link endGame} when hero wins with {@link heroLifeForce} positive
     * @function universeSaved
     */
    const universeSaved = () => {
        console.log("universeSaved");
        setBattleBackGround("lonelySpace");
        // gameSpace.css({
        //     background: "url(../unit-4-game/assets/img/lonelySpace.gif) no-repeat",
        //     backgroundSize: "100% 100%"
        // });

        animateCSS("#gameStatus", "zoomOutLeft");
        gameStatus.css({ display: "none" });
        animateCSS("#gameClues", "zoomOutLeft", function () {
            gameClues.html(universeSavedInstruction);
            animateCSS('#gameClues', 'zoomInLeft');
        });
        //pauseAudio();
        gameAudio.src = "./assets/audio/AnakinsSymphony.mp3";
        playAudio();
    }


    /**
     * Called from {@link endGame} when villain wins, when {@link heroLifeForce} < 0
     * @function allIsLost
     */
    const allIsLost = () => {
        console.log("allIsLost");
        setBattleBackGround("sun");
        // gameSpace.css({
        //     background: "url(../unit-4-game/assets/img/sun.gif) no-repeat",
        //     backgroundSize: "100% 100%"
        // });

        animateCSS("#gameStatus", "zoomOutLeft");
        gameStatus.css({ display: "none" });
        animateCSS("#gameClues", "zoomOutLeft", function () {
            gameClues.html(allIsLostInstruction);
            animateCSS('#gameClues', 'zoomInLeft');
        });
        // pauseAudio();
        // gameAudio.src = "./assets/audio/Evil.mp3";
        $("#gameAudio").attr("src", "./assets/audio/Evil.mp3");
        // $("#gameAudio").play();
        // testLoad();
        // testAudio();
        playAudio();
    }


    function testLoad() {
        var playPromise = gameAudio.src = "./assets/audio/Evil.mp3";

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                console.log('KEPT promise testAudio game audio');
            })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log('IGNORED promise, testAudio game audio');
                });
        }
    }



    // Show loading animation.
    /**
     * test audio function with promise error handling, works ok
     * @function testAudio
     */
    function playAudio() {
        var playPromise = gameAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log('KEPT promise testAudio game audio');
            })
                .catch(error => {
                    villainDeadCount = 0;
                    // darthSidious.css({ display: "inline" });
                    // darthVader.css({ display: "inline" });
                    // darthMaul.css({ display: "inline" });
                    console.log('IGNORED promise, testAudio game audio');
                });
        }
    }



    // function testAudio1() {
    //     // This will allow us to play video later...
    //     gameAudio.load();
    //     fetchVideoAndPlay();
    // }

    // function fetchVideoAndPlay() {
    //     fetch("./assets/audio/Evil.mp3")
    //         .then(response => response.blob())
    //         .then(blob => {
    //             gameAudio.srcObject = blob;
    //             return gameAudio.play();
    //         })
    //         .then(_ => {
    //             console.log("playing from testAudio");
    //             // Video playback started ;)
    //         })
    //         .catch(e => {
    //             villainDeadCount = 0;
    //             darthVaderChosen = false;
    //             darthSidiousChosen = false;
    //             darthMaulChosen = false;
    //         })
    // }


    /** 
     * Called from restart() or from play music button on home screen
     * @function playAudio
     * @param {string} songTitle if null then just play existing, string is name of .mp3 file without extension
     */
    // const playAudio = () => {
    //     // console.log("songTitle: ", songTitle);
    //     // if (songTitle !== "") gameAudio.src = "./assets/audio/" + songTitle + ".mp3";
    //     gameAudio.play();
    // }




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

});