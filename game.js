var buttoncolor = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedpattern = [];
var correct = [];
var level = 0;
var started = false;

//It Calls Function only one time so that on clicking further does't increase the level
$(document).keypress(function() {
    if(!started) {
        nextSequence();
        started=true;
    }
})

//It Generates the next Secquence
function nextSequence() {
        userClickedpattern = [];
        correct=[];
        started=true;
        level++;
        var randomNumber = Math.floor(Math.random() * 4);
        // console.log(randomNumber);
        var randomChosenColour = buttoncolor[randomNumber];
        // console.log(randomChosenColour);
    
        gamePattern.push(randomChosenColour);
        // console.log(gamePattern);
    
        $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
        playSound(randomChosenColour);
        
        $("#level-title").text("Level " + level);
}

function playSound (name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")} , 100);
}

$(".btn").click(function() { 
    var userChosenColour = this.id;
    userClickedpattern.push(userChosenColour);
    // console.log(userClickedpattern);
    $(".btn").click(playSound(userChosenColour));
    animatePress(userChosenColour);
    checkAnswer(userClickedpattern.length-1);
});


function checkAnswer(currentLevel) {
    if(userClickedpattern[currentLevel] == gamePattern[currentLevel]){
        correct.push(true);
    } else {
        
        correct.push(false);

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        //Animate body when user got wrong answer
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        } , 200);

        //Title change
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    // console.log(correct);

    //It will only call nextsequency if the userSecquence is completed and there is no wrong answer inbetween.
    if(userClickedpattern.length === gamePattern.length && !correct.includes(false)) {
        setTimeout(function() {
            nextSequence();
        },1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}