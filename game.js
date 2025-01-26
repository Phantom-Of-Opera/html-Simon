var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

//--------------------- FUNCTIONS ---------------------------

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColours[randomNumber];

	level++;
	$("h1").text("Showing level " + level);
	gamePattern.push(randomChosenColor);

	var i = 0;
	var tempo = 1000 / (1 + 0.1 * level);

	while (i < gamePattern.length) {
		(function (index) {
			setTimeout(() => {
				$("#" + gamePattern[index])
					.fadeOut(100)
					.fadeIn(100);
				playSound(gamePattern[index]);
			}, index * tempo); // Increment delay for each iteration
		})(i);
		i++;
	}

	$("h1").text("Your turn playing level " + level);
	userClickedPattern = [];
}

function playSound(colorSound) {
	$("#" + colorSound + "Sound")[0].play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function animateFail(currentColor) {
	$("#" + currentColor).addClass("failed");
	setTimeout(() => {
		$("#" + currentColor).removeClass("failed");
	}, 800);
}

function checkAnswer(index) {
	if (userClickedPattern[index] == gamePattern[index]) {
		return true;
	} else {
		return false;
	}
}

function gameOver(solutionColor) {
	playSound("wrong");
	setTimeout(() => {
		animateFail(solutionColor);
	}, 1000);

	$("body").addClass("game-over");
	setTimeout(() => {
		$("body").removeClass("game-over");
	}, 200);
	$("h1").text("GAME OVER!");
	setTimeout(() => {
		$("h1").text("Press any key to restart.");
	}, 2000);
	startOver();
}

function startOver() {
	gameStarted = false;
	gamePattern = [];
	level = 0;
}
//--------------------- EVENTS --------------------------

$(document).on("keypress", function () {
	if (gameStarted == false) {
		stop;
		nextSequence();
		gameStarted = true;
	}
});

$(".btn").on("click", function () {
	if (gameStarted == true) {
		var userChosenColor = this.id;
		userClickedPattern.push(userChosenColor);
		playSound(userChosenColor);
		animatePress(userChosenColor);

		if (checkAnswer(userClickedPattern.length - 1) == false) {
			gameOver(gamePattern[userClickedPattern.length - 1]);
		} else if (userClickedPattern.length == gamePattern.length) {
			$("h1").text("Well done ! Get ready...");
			setTimeout(() => {
				nextSequence();
			}, 2000);
		}
	}
});
