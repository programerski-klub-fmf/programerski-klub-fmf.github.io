// source: https://stackoverflow.com/questions/30747235/javascript-pi-%CF%80-calculator
function * generateDigitsOfPi() {
	let q = 1n;
	let r = 180n;
	let t = 60n;
	let i = 2n;
	while (true) {
		let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
		yield Number(digit);
		let u = i * 3n;
		u = (u + 1n) * 3n * (u + 2n);
		r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
		q *= 10n * i * (i++ * 2n - 1n);
		t *= u;
	}
}

var difficulity = 3; // how many numbers are spawned at the same time
var time = 0; // current elapsed time of current difficulity
var spawnTimer = 0;
var piIter;
window.onload = function() { };
setInterval(function(){ spawner(); }, 10);
setInterval(function(){ updatePos(); }, 10);

document.onmousemove = handleMouseMove

// move catcher in pi shape to mouse position
function handleMouseMove(event) {
	if (isInPlay() && event.target.id == "canvas") {
		var mouse = document.getElementById("mouse");
		var rect = event.target.getBoundingClientRect();
		var mouseX = event.clientX - rect.left;
		var mouseY = event.clientY - rect.top;
		mouse.style.left = mouseX - mouse.offsetWidth / 2 + "px";
		mouse.style.top = mouseY - mouse.offsetHeight / 2 + "px";
	}
}
// spawn numbers with delay and over time increase how many numbers are spawned at the same time (difficulity)
function spawner() {
	if (isInPlay()) {
		time += 0.01;
		spawnTimer += 0.01;
		let spawnDelay = 1 / (Math.log(time + 1)); // delay decreases as time passes
		if(spawnTimer > spawnDelay) {
			spawnTimer -= spawnDelay;
			spawnNumber(difficulity);
		}
		if(spawnDelay < 0.3) {
			difficulity += 2;
			time = 0;
		}
	}
}
// spawn multiple (spawnCount) numbers at random x positions
function spawnNumber(spawnCount) {
	if(isInPlay()) {
		var numbers = document.getElementById("numbers");
		for (var i = 0; i < spawnCount; i++) {
			let num = document.createElement("div");
			num.classList.add("pi-game-number");
			num.style.top = "-60px";
			num.style.left = Math.random() * (document.getElementById("canvas").offsetWidth - 30) + "px"; // -30 to not go offscreen on right side
			num.innerText = Math.floor(Math.random() * 10);
			numbers.appendChild(num);
		}
	}
}
// move numbers down, check collision and destroy them when they reach bottom
function updatePos() {
	if (isInPlay()) {
		var mouse = document.getElementById("mouse");
		var numbers = document.getElementById("numbers");
		for	(var i = 0; i < numbers.childElementCount; i++) {
			let top = parseInt(numbers.children[i].style.top, 10);
			// delete number when it reaches bottom border of canvas
			if (top > document.getElementById("canvas").offsetHeight) {
				numbers.removeChild(numbers.children[i]);
			}
			else {
				let left = parseInt(numbers.children[i].style.left, 10);
				let distSquared = Math.pow(left - parseInt(mouse.style.left, 10) - mouse.offsetWidth / 4, 2) + 
									Math.pow(top - parseInt(mouse.style.top, 10) - mouse.offsetHeight / 4, 2);
				// pick number with mouse
				if(distSquared < 1200) {
					pickNumber(numbers.children[i].innerText);
					numbers.removeChild(numbers.children[i]);
				}
				// move number down
				else {
					numbers.children[i].style.top = top + 2 + "px";
				}
			}
		}
	}
}
// check if picked number is correct and continue or stop the game
function pickNumber(num) {
	var pickedNumbers = document.getElementById("pickedNumbers");
	var nextNumberValue = document.getElementById("nextNumberValue");
	// correct number was picked
	if(num == nextNumberValue.innerText) {
		if(pickedNumbers.innerText.length == 1) {
			pickedNumbers.innerText += "." + num;
		}
		else {
			pickedNumbers.innerText += num;
		}
		advanceTargetNumber();
	}
	else {
		onLose();
	}
}
// update showed target number to next digit of pi
function advanceTargetNumber() {
	document.getElementById("nextNumberValue").innerText = piIter.next().value;
}
// show play button and collected digits count
function onLose() {
	var pickedNumbers = document.getElementById("pickedNumbers");
	document.getElementById("playButton").hidden = false;
	
	// show collected digits count
	document.getElementById("reachedScoreValue").innerText = pickedNumbers.innerText.length - ((pickedNumbers.innerText.length > 1) ? 1 : 0)
	document.getElementById("reachedScore").hidden = false;
}
// clean up previous game then initilize and start new play
function restartPlay() {
	time = 0;
	spawnTimer = 0;
	difficulity = 3;
	document.getElementById("playButton").hidden = true;
	document.getElementById("reachedScore").hidden = true;
    if ( document.getElementById("gameHardMode").checked ) {
        document.getElementById("nextNumber").hidden = true;
    } else {
        document.getElementById("nextNumber").hidden = false;
    }
	document.getElementById("pickedNumbers").hidden = false;
	// delete all numbers that are still visible
	var numbers = document.getElementById("numbers");
	for (var i = numbers.childElementCount - 1; i >= 0; i--) {
		numbers.removeChild(numbers.children[i]);
	}
	document.getElementById("pickedNumbers").innerText = "";
	// reset generator for target numbers
	piIter = generateDigitsOfPi();
	advanceTargetNumber(); 
}
function isInPlay() {
	return document.getElementById("playButton").hidden;
}
