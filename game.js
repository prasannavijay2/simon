var buttonColours=["red", "blue", "green", "yellow"];


var gamePattern=[];
var userClickedPattern=[];


$(".btn").click(function(){
  var userChosenColour =this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

var started=false;
var level=0;

 $(document).keypress(function(){
   if(!started){
    $("#level-title").text("Level "+level);
   nextSequence();}
   started=true;

 });
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }else{
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
}, 100);
}


function startOver(){
   started=false;
   level=0;
   gamePattern=[];
}