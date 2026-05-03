// Source: https://stackoverflow.com/questions/30747235/javascript-pi-%CF%80-calculator
function * generateDigitsOfPi () {
  let q = 1n
  let r = 180n
  let t = 60n
  let i = 2n
  while (true) {
    let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n)
    yield Number(digit)
    let u = i * 3n
    u = (u + 1n) * 3n * (u + 2n)
    r = u * 10n * (q * (i * 5n - 2n) + r - t * digit)
    q *= 10n * i * (i++ * 2n - 1n)
    t *= u
  }
}

let difficulty = 3 // How many numbers are spawned at the same time
let difficultyTimer = 0 // Current elapsed time of current difficulty
let spawnTimer = 0

let piIter

setInterval(function () { spawner() }, 10)
setInterval(function () { updater() }, 10)

const gameCanvas = document.getElementById('game-canvas')
const gameNumbers = document.getElementById('game-numbers')
const gameMouse = document.getElementById('game-mouse')
const gameStartButton = document.getElementById('game-start-button')
const gameScore = document.getElementById('game-score')
const gameScoreValue = document.getElementById('game-score-value')
const gameNextNumber = document.getElementById('game-next-number')
const gameNextNumberValue = document.getElementById('game-next-number-value')
const gamePickedNumbers = document.getElementById('game-picked-numbers')
const gameHardMode = document.getElementById('game-hard-mode')

// Spawn numbers with delay and over time increase how many numbers are spawned at the same time (difficulty)
function spawner () {
  if (isInPlay()) {
    difficultyTimer += 0.01
    spawnTimer += 0.01
    const spawnDelay = 1 / (Math.log(difficultyTimer + 1)) // Delay decreases as time passes
    if (spawnTimer > spawnDelay) {
      spawnTimer -= spawnDelay
      spawnNumber(difficulty)
    }
    if (spawnDelay < 0.3) {
      difficulty += 2
      difficultyTimer = 0
    }
  }
}

// Spawn multiple numbers at random x positions
function spawnNumber (spawnCount) {
  for (let i = 0; i < spawnCount; i++) {
    let num = document.createElement('div')
    num.classList.add('game-number')
    num.style.top = '-60px'
    num.style.left = Math.random() * (gameCanvas.offsetWidth - 30) + 'px' // -30 to not go offscreen on right side
    num.innerText = Math.floor(Math.random() * 10)
    gameNumbers.appendChild(num)
  }
}

// Move numbers down, check collision and destroy them when they reach bottom
function updater () {
  if (isInPlay()) {
    for (let i = 0; i < gameNumbers.childElementCount; i++) {
      const top = parseInt(gameNumbers.children[i].style.top, 10)
      const left = parseInt(gameNumbers.children[i].style.left, 10)

      // Delete number when it reaches bottom border of canvas
      if (top > gameCanvas.offsetHeight) {
        gameNumbers.removeChild(gameNumbers.children[i])
        continue
      }

      let distSquared = Math.pow(left - parseInt(gameMouse.style.left, 10) - gameMouse.offsetWidth / 4, 2)
        + Math.pow(top - parseInt(gameMouse.style.top, 10) - gameMouse.offsetHeight / 4, 2)

      // Pick number with mouse
      if (distSquared < 1200) {
        pickNumber(gameNumbers.children[i].innerText)
        gameNumbers.removeChild(gameNumbers.children[i])
        continue
      }

      // Move number down
      gameNumbers.children[i].style.top = top + 2 + 'px'
    }
  }
}

// Check if picked number is correct and continue or stop the game
function pickNumber (num) {
  // Correct number was picked
  if (num === gameNextNumberValue.innerText) {
    if (gamePickedNumbers.innerText.length === 1) {
      gamePickedNumbers.innerText += '.' + num
    } else {
      gamePickedNumbers.innerText += num
    }
    advanceTargetNumber()
  } else {
    stopGame()
  }
}

// Update showed target number to next digit of pi
function advanceTargetNumber () {
  gameNextNumberValue.innerText = piIter.next().value
}

// Show play button and collected digits count
function stopGame () {
  // Show start button
  gameStartButton.hidden = false

  // Show collected digits count
  gameScoreValue.innerText = gamePickedNumbers.innerText.length - ((gamePickedNumbers.innerText.length > 1) ? 1 : 0)
  gameScore.hidden = false
}

document.onmousemove = handleMouseMove

// Move catcher in pi shape to mouse position
function handleMouseMove (event) {
  if (gameCanvas.contains(event.target)) {
    const rect = gameCanvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top
    gameMouse.style.left = mouseX - gameMouse.offsetWidth / 2 + 'px'
    gameMouse.style.top = mouseY - gameMouse.offsetHeight / 2 + 'px'
    gameMouse.hidden = false
  }
}

// Clean up previous game then initialize and start new play
function restartPlay () {
  // Reset the parameters
  difficulty = 3
  difficultyTimer = 0
  spawnTimer = 0

  // Delete all numbers that are still visible
  for (const number of gameNumbers.children ?? []) number.remove()

  gameStartButton.hidden = true
  gameScore.hidden = true

  gameNextNumber.hidden = !!gameHardMode.checked

  gamePickedNumbers.innerText = ''
  gamePickedNumbers.hidden = false

  // Reset generator for target numbers
  piIter = generateDigitsOfPi()
  advanceTargetNumber()
}

function isInPlay () {
  return gameStartButton.hidden
}
