var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern= [];

var level = 0;
var start = false;

$(document).keydown(function(){
  if(!start){
    nextSequence();
    start = true;
  }
});

$(".btn").click(function(){

  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
      nextSequence();
    },100);
   }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver()
  }
}


function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(color){
  $("#"+color).addClass("pressed");

  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}

function startOver(){
  level= 0;
  gamePattern = [];
  start = false;
}
