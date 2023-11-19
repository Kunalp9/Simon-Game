
const buttonColors = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedButton = [] ;

var level = 0;

var flag = 0;

//for starting the game/restarting
$("body").on("keydown",function(){

    
    if (flag === 0){
        
        $("h1").html("Level "+(level));
        nextSequence();

        flag =1;
    }
    
})

//detecting the clicks
$(".btn").on("click", function(){

    var userChosenColor = $(this).attr("id");
    userClickedButton.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    
    checkAnswer(userClickedButton.length-1); //checking the answer after selecting the colors
})

//function for checking the correct answer
function checkAnswer(currentLevel){


    if (userClickedButton[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedButton.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
    

            },700);
        }

    }
    else{

        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").html("Game Over, Press Any Key to Restart");
        
        startOver();

    }

}

//function for generating color pattern
function nextSequence(){
    userClickedButton = [];
    level++;

    $("h1").html("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColor);
}

function startOver(){
    level = 0;
    flag = 0;
    gamePattern =[];
}

//function to play sound
function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(color){

    $("#"+color).addClass("pressed");
    
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

