const buttonColors= ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).on("keypress", function(){
    //function to call next sequence method on key press to play sound and animations
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
  });

$(".btn").click(function(){
    //know what button  user is clicking
    var userChosenColor= $(this).attr("id");
    //add the number clicked in clicked pattern array
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playsound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });
  
  function playsound(name){
    $("." + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio= new Audio("sounds/" +name+ ".mp3");
    audio.play();
    animatePress(name);
  }

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //select random number sequence and getting random color from it
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //to play sound
    playsound(randomChosenColor);
}
  function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            console.log("Success");
            if(userClickedPattern.length=== gamePattern.length){
                console.log("Next sequence");
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
        else{
            console.log("Fail");
            playsound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
             },200);
             $("#level-title").text("Game Over, Press any key to restart");
             startOver();
        }
}

function startOver(){
    level=0;
    gamePattern=[];
    started= false;
}


  
