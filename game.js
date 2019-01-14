// VARIABLES

//game sequence
var gamePattern = [];
//user sequence
var userClickedPattern = [];
//colors of buttons
var buttonColors = ["red", "blue", "green", "yellow"];
//whether game has started or not
var gameStarted = false;
//level starts at 0
var level = 0;


// GAMEPLAY

//start the game when user presses a key
$(document).keypress(function(){
  if(gameStarted === false){
    $("#level-title").text("Level 0");
    gameStarted = true;
    nextSequence();
  }
});

//add element to game sequence
function nextSequence(){
  //increase level
  level++;
  //show level on screen
  $("#level-title").text("Level "+level);
  //generate random number between 0 and 3 inclusive
  var randomNumber = Math.floor((Math.random() * 4));
  //select a button color based on the randomNumber
  var randomChosenColour = buttonColors[randomNumber];
  //push the button color to the gamePattern array
  gamePattern.push(randomChosenColour);
  //add flash animation to button
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //play button sound
  playSound(randomChosenColour);
}

//when a user clicks a button, add it to their sequence
$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  //check if last answer is correct
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    //check if user is finished the pattern
    if(userClickedPattern.length === gamePattern.length){
      // if finsished wait 1s then call nextSequence
      setTimeout(function(){
        nextSequence();
        //reset user sequence for next level
        userClickedPattern = [];
      }, 1000);
    }
  }
  else{
    //if answer is wrong play wrong answer sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    //add game over class then remove it after 2ms
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press any Key to Restart");
    startOver();
  }
}

//end game, reset values
function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


// BUTTONS

//play sound for button
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//animate button press
function animatePress(currentColor){
  //add pressed class to clicked button
  $("#"+currentColor).addClass("pressed");
  //remove pressed class after 100 ms
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}
