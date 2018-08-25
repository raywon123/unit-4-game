$(document).ready(function () {

    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }


    // Object for player
    function Person(name, shortname, health, attackPoint, counter_attackPoint, isFriendly) {
        this.name = name;
        this.shortname = shortname;
        this.health = health;
        this.attackPoint = attackPoint;
        this.counter_attackPoint = counter_attackPoint;
        this.isFriendly = isFriendly;

        this.attacking = function (defenderPoint) {
            this.health -= defenderPoint;
            // console.log(this.name + " " + defenderPoint + "health" + this.health);
        };

        this.defending = function (attackerPoint, multiple) {
            this.health -= (attackerPoint * multiple);
            // console.log(this.name + " " + attackerPoint + "health" + this.health);
        };
    }

    // function for battle
    function battle(winner, loser, multiple) {
        winner.attacking(loser.counter_attackPoint);
        loser.defending(winner.attackPoint, multiple);
    }

    // function for printing out players
    function displayPlayers(players) {
        // $("#buttons").empty();
        for (let i = 0; i < players.length; i++) {
            let letterBtn = $("<button>");
            letterBtn.addClass("btn btn-primary player btn2");
            letterBtn.attr("data-letter", players[i].name);
            letterBtn.attr("value", players[i].shortname);
            letterBtn.text(players[i].name);
            $("#buttons").append(letterBtn);
        }
    }



    //---------------------------------------------------------------------
    // let letters = ["Doctor", "Dalek", "Cyberman", "The Master", "Rose Tyler", "Captain Jack"];
    // let values = ["doctor", "dalek", "cyberman", "master", "roseTyler", "captainJack"]

    // for (let i = 0; i < letters.length; i++) {
    //     let letterBtn = $("<button>");
    //     letterBtn.addClass("btn btn-primary player btn2");
    //     letterBtn.attr("data-letter", letters[i]);
    //     letterBtn.attr("value", values[i]);
    //     letterBtn.text(letters[i]);
    //     $("#buttons").append(letterBtn);
    // }

    //---------------------------------------------------------------------
    // Person object properties:
    //   1. name = name of the charater 
    //   2. shortname = short name for the character, match the variable name
    //   2. health = character's health point
    //   3. attackPoint = when attacking, points that will reduce the opponent's health
    //   4. counter_attackPoint = when defending, points that will reduce the opponent's health
    //   5. isFriendly - true for the good guys, false for the bad guys.

    let doctor = new Person('The Doctor', 'doctor', 1500, 280, 150, true);
    let dalek = new Person('Dalek', 'dalek', 200, 200, 50, false);
    let cyberman = new Person('Cyberman', 'cyberman', 500, 100, 100, false);
    let master = new Person('The Master', 'master', 1200, 300, 150, false);
    let roseTyler = new Person('Rose Tyler', 'roseTyler', 500, 100, 50, true);
    let captainJack = new Person('Captain Jack', 'captainJack', 700, 200, 100, true);

    let players = [doctor, roseTyler, captainJack, dalek, cyberman, master];


    let name = '';
    let choosePlayer = '';
    let isDefenderChosen = false;

    let attacker = '';
    let defender = '';
    let isGameStarted = false;
    let isBattleEnded = false;
    let playernames = [];
    let friendlyList = [];

    // win or lose will be implemented by a random generator
    // let wins = [1, 0, 1, 1, 1, 1];
    // let win = Math.floor(Math.random() * 2);
    // let wins = generateRandomNumberArray(2, 10);
    // let wins=[];

    // ---
    let win_count = 0;

    // console.log("find it" + players.includes(doctor));

    // displayPlayers(players);

    $(".player").on("click", function () {
        console.log($(this).val());

        name = $(this).val();
        if (name === 'doctor') {
            choosePlayer = doctor;
        }
        if (name === 'dalek') {
            choosePlayer = dalek;
        }
        if (name === 'cyberman') {
            choosePlayer = cyberman;
        }
        if (name === 'roseTyler') {
            choosePlayer = roseTyler;
        }
        if (name === 'master') {
            choosePlayer = master;
        }
        if (name === 'captainJack') {
            choosePlayer = captainJack;
        }

        console.log(choosePlayer);

        // choose attacker
        if (!attacker) {

            attacker = choosePlayer;
            removeElement(players, attacker);


            // remove friendly in players
            for (let i = 0; i < players.length; i++) {

                if (attacker.isFriendly === players[i].isFriendly) {
                    friendlyList.push(players[i].shortname);

                }
            }

            for (let i = 0; i < friendlyList.length; i++) {
                if (friendlyList[i] === 'roseTyler') {
                    removeElement(players, roseTyler);
                }
                if (friendlyList[i] === 'captainJack') {
                    removeElement(players, captainJack);
                }
                if (friendlyList[i] === 'doctor') {
                    removeElement(players, doctor);
                }
                if (friendlyList[i] === 'master') {
                    removeElement(players, master);
                }
                if (friendlyList[i] === 'dalek') {
                    removeElement(players, dalek);
                }
                if (friendlyList[i] === 'cyberman') {
                    removeElement(players, cyberman);
                }
            }


            console.log(friendlyList);
            console.log(players);

            for (let i = 0; i < players.length; i++) {
                playernames.push(players[i].name);
            }

            // -- printout
            $(".first-number").text("You are " + attacker.name + ".    [health point = " + attacker.health + "]");
            console.log("attacker is " + attacker.name);
            $(".instruction").text("Choose Your Opponent: ");
            $(".instruction2").text(playernames);
            $(".instruction3").text("");
            $(".result").text("Opponents Remaining:     " + playernames);
        }

        // test cases:
        // let attacker = doctor;
        // attacker = roseTyler ;
        // ------------------------

        // choose defender
        console.log("defenderchosen = " + isDefenderChosen)
        console.log(choosePlayer);
        if (players && !isDefenderChosen) {
            console.log(players);
            defender = choosePlayer;
            console.log(defender);
        }

        if (defender.name !== attacker.name && players.includes(defender)) {

            isGameStarted = true;
            removeElement(players, defender);

            console.log(players);

            removeElement(playernames, defender.name);
            isBattleEnded = false;
            isDefenderChosen = true;

            // wins = generateRandomNumberArray(2, 20);

            // -- printout
            $(".instruction").text("Click Attack Button To Fight.");
            $(".instruction2").text("");
            $(".instruction3").text("");
            $(".second-number").text("Your Opponent is " + defender.name + ".    [health point = " + defender.health + "]");
            $(".result").text("Opponents Remaining:     " + playernames);
            console.log("defender is " + defender.name);
            // $(".instruction").text("INSTRUCTION: Click the Attack Button");
        }



    });

    // attack sequence
    $(".attack").on("click", function () {

        if (isGameStarted && !isBattleEnded) {
            // for (let i = 0; i < players.length; i++) {
            // let defender = players[i];
            console.log("before attacker=" + attacker.name + " " + attacker.health);
            console.log("before defender=" + defender.name + " " + defender.health);
            // if (attacker.health < 1) {
            //     break;
            // }
            // for (let j = 0; j < wins.length; j++) {
            //     if (attacker.health < 1 || defender.health < 1) {
            //         break;
            //     }

            let win = Math.floor(Math.random() * 2);
            console.log("win=" + win);

            if (win) {
                win_count++;
                battle(attacker, defender, win_count);
                if (defender.health > 0) {
                $(".instruction").text("Win This Round. Click Attack Button To Fight Again.");
                console.log("inside attacker=" + attacker.name + " " + attacker.health);
                console.log("inside defender=" + defender.name + " " + defender.health);
                }
                else {
                    $(".instruction").text("You Win. " + defender.name + " is dead.");
                    $(".instruction2").text("Choose Your Next Opponent: ");
                    $(".instruction3").text(playernames);
                }
            }
            else {
                battle(defender, attacker, 1);
                $(".instruction").text("Lose This Round. Click Attack Button To Fight Again.");
            }

            //-- print out

            $(".first-number").text("You are " + attacker.name + ".    [health point = " + attacker.health + "]");
            $(".second-number").text("Your Opponent is " + defender.name + ".    [health point = " + defender.health + "]");
            console.log("defender is " + defender.name);
            console.log("final attacker=" + attacker.name + " " + attacker.health);
            console.log("final defender=" + defender.name + " " + defender.health);
        }

        if (isGameStarted && (attacker.health < 1 || defender.health < 1)) {
            isBattleEnded = true;
            isDefenderChosen = false;
            console.log("final = " + playernames);
            if (attacker.health < 1) {
                $(".instruction").text("You Lose. " + attacker.name + " is dead.");
                $(".instruction2").text("Refresh in Browser To Restart The Game.");
                $(".instruction3").text("");
            }
            else if (playernames.length > 1) {
                $(".instruction").text("You Win. " + defender.name + " is dead.");
                $(".instruction2").text("Choose Your Next Opponent: ");
                $(".instruction3").text(playernames);
            }
            else if (playernames.length < 1) {
                $(".instruction").text("You Win. " + defender.name + " is dead.");
                $(".instruction2").text("Refresh in Browser To Restart The Game.");
                $(".instruction3").text("");
            }

        }

    });

});