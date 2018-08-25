# unit-4-game

[Doctor Who RPG Game](
https://raywon123.github.io/unit-4-game/ )

[My Portfolio Page](
https://raywon123.github.io/portfolio.html )

#### How It Works:
* Choose a character by clicking the picture, then choose the opponent, then click the attack button to simulate the battle. Win or lose is based on health points, attack points and counter attack points of each character.

#### How It Is Built:
* Using JavaScript object and jQuery to bind objects to the DOM.

#### How To Test:
*

#### What Needs To Be Done:
This project is done with a time constraint so not all the desired features are done.

Below are the items need to work on:

* Bind the health points to the character pictures. This can be done by creating tag using jQuery. I branched Feature 1 to work on this.

  code sample:
  
    let hpdoctor = $(".btn-doctor .caption");
    
    hpdoctor.append(" " + doctor.health);
    
    or 
    
    hpmaster.text("The Master" + master.health);

* "Once the player selects an opponent, that enemy is moved to a defender area." I was making the picture bigger when the character is chosen. To move the characters, first I will create the box, then I would use the similar idea to the jQuery visibility: 

   code sample:
   
    btndoctor.animate({ left: "-=200px" }, "normal");

* Need Reset button.

* Need to add the initialization function.

* To make it fun, I should allow the bad guys to fight each other. Currently I am only allow good guys fighting bad guys and not against its team members.

* add music
   
   code sample:
   
   let  audioElement = document.createElement("audio");
   
   audioElement.setAttribute("src", "assets/music/doctor_who.mp3");

   
   $(".theme-button").on("click", function() {
   
       audioElement.play();
       
    });
    
    $(".pause-button").on("click", function() {
    
          audioElement.pause();
          
    });
