var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event) {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    // Increase Level
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Animate flash to selected button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    // Play sound for colour selected
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}