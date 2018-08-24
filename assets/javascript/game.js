$(document).ready(function () {

    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }


    // Object for player
    function Person(name, health, attackPoint, counter_attackPoint, isFriendly) {
        this.name = name;
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


    //--------------------------------------------------


    // var letters = ["A", "B", "C", "D"];

    // for (var i = 0; i < letters.length; i++) {

    //     var letterBtn = $("<button>");
    //     letterBtn.addClass("letter-button letter letter-button-color");
    //     letterBtn.attr("data-letter", letters[i]);
    //     letterBtn.text(letters[i]);
    //     $("#buttons").append(letterBtn);
    // }

    // $(".letter-button").on("click", function () {
    //     var fridgeMagnet = $("<div>");
    //     fridgeMagnet.addClass("letter fridge-color");
    //     fridgeMagnet.text($(this).attr("data-letter"));
    //     $("#display").append(fridgeMagnet);

    // });

    // $("#clear").on("click", function () {
    //     $("#display").empty();
    // });

    //---------------------------------------------------------------------
    // Person object properties:
    //   1. name = name of the charater 
    //   2. health = character's health point
    //   3. attackPoint = when attacking, points that will reduce the opponent's health
    //   4. counter_attackPoint = when defending, points that will reduce the opponent's health
    //   5. isFriendly - true for the good guys, false for the bad guys.

    let doctor = new Person('The Doctor', 1000, 250, 150, true);
    let dalek = new Person('Dalek', 200, 200, 50, false);
    let cyberman = new Person('Cyberman', 500, 100, 100, false);
    let master = new Person('The Master', 1200, 300, 150, false);
    let roseTyler = new Person('Rose Tyler', 500, 100, 50, true);
    let captainJack = new Person('Captain Jack', 700, 200, 100, true);

    let players = [doctor, dalek, cyberman, master, roseTyler];


    let name = '';
    let choosePlayer = '';

    let attacker = '';
    let defender = '';
    let gameStarted = false;
    let playernames = [];

    // win or lose will be implemented by a random generator
    let wins = [1, 0, 1, 1, 1, 1];

    // ---
    let win_count = 0;

    // console.log("find it" + players.includes(doctor));

    $(".number").on("click", function () {
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

        // choosing attacker
        if (!attacker) {

            attacker = choosePlayer;
            removeElement(players, attacker);

    
            for (let i = 0; i < players.length; i++) {
                playernames.push(players[i].name);
            }

            // -- printout
            $("#first-number").text("You are " + attacker.name + ".    [health point = " + attacker.health + "]");
            console.log("attacker is " + attacker.name);
            $(".instruction").text("INSTRUCTION: Choose Your Opponent");
            $("#result").text("Opponents Left Are:     " + playernames);
        }

        // test cases:
        // let attacker = doctor;
        // attacker = roseTyler ;
        // ------------------------


        if (players) {
            console.log(players);
            defender = choosePlayer;
            console.log(defender);
        }

        if (defender.name !== attacker.name) {

            gameStarted = true;
            removeElement(players, defender);

            console.log(players);

            removeElement(playernames, defender.name);

            // -- printout
            $("#second-number").text("Your Opponent is " + defender.name + ".    [health point = " + defender.health + "]");
            $("#result").text("Opponents Left Are:     " + playernames);
            console.log("defender is " + defender.name);
            // $(".instruction").text("INSTRUCTION: Click the Attack Button");
        }

        if (gameStarted) {
            // for (let i = 0; i < players.length; i++) {
            // let defender = players[i];
            console.log("before attacker=" + attacker.name + " " + attacker.health);
            console.log("before defender=" + defender.name + " " + defender.health);
            // if (attacker.health < 1) {
            //     break;
            // }
            for (let j = 0; j < wins.length; j++) {
                if (attacker.health < 1 || defender.health < 1) {
                    break;
                }
                if (wins[j]) {
                    win_count++;
                    battle(attacker, defender, win_count);
                    console.log("inside attacker=" + attacker.name + " " + attacker.health);
                    console.log("inside defender=" + defender.name + " " + defender.health);
                }
                else {
                    battle(defender, attacker, 1);
                }
                $("#first-number").text("You are " + attacker.name + ".    [health point = " + attacker.health + "]");
                $("#second-number").text("Your Opponent is " + defender.name + ".    [health point = " + defender.health + "]");
                console.log("defender is " + defender.name);
                console.log("final attacker=" + attacker.name + " " + attacker.health);
                console.log("final defender=" + defender.name + " " + defender.health);
            }
        }
        //  }
    });


});