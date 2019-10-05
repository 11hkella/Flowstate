console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")
const buttonYellow = document.getElementById("yellow")
const buttonPurple = document.getElementById("purple")
const buttonGreen = document.getElementById("green")
const playGame = document.getElementById("playGame")
const messageBox = document.getElementById("messageBox")
const scoreBox = document.getElementById("score")
const roundBox = document.getElementById("round")
const highscoreBox = document.getElementById("highscore")

//      SYNTH
const synth = new Tone.Synth().toMaster()
//***********  USER  *************************************************
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", controller)
let disableControl = true
function controller(e) {
    if (disableControl) {
        return
    }
    if (e.keyCode === 70) { //f blue index:0
        controllerAnimation("glow-blue", "B3")
        push(0)
    }
    if (e.keyCode === 74) { // j red index:1
        controllerAnimation("glow-red", "D4")
        push(1)
    }
    if (e.keyCode === 67) { // c yellow index:2
        controllerAnimation("glow-yellow", "F#4")
        push(2)
    }
    if (e.keyCode === 32) { // space purple index:3
        controllerAnimation("glow-purple", "A4")
        push(3)
    }
    if (e.keyCode === 77) { // m green index:4
        controllerAnimation("glow-green", "C#4")
        push(4)
    }
}

// animator for keys
function controllerAnimation(aniKey, note) {
    synth.triggerAttackRelease(note, '8n')
    let button = document.getElementById(aniKey.slice(5))
    console.log(button)
    button.classList.remove(aniKey)
    void button.offsetWidth
    console.log('add ani')
    button.classList.add(aniKey)
}

// Create array from user inputs
let userArr = []
function push(iButton) {
    userArr.push(iButton)
    console.log(userArr)
    comparePatterns()
}

//****************  SIMON COMPUTER  **********************************
//randomly generated array 
let pattern = []
function createPattern() {
    let nextnum = Math.floor(Math.random() * 5)
    if (nextnum === pattern[pattern.length - 1] || nextnum === pattern[pattern.length - 2]) {
        console.log('reset!!!!')
        pattern.push(Math.floor(Math.random() * 5))
    }
    else {
        pattern.push(nextnum)
    }
    console.log(pattern)
}

// Play pattern animation
const animationIndex = ["glow-blue", "glow-red", "glow-yellow", "glow-purple", "glow-green"]
const computerChord = ["A3", "C#4", "E3", "G#4", "B4"]
function playPattern(speed = 450) {
    let i = 0
    let button;
    messageToPlayer("SIMON SAYS!", 300)
    let play = setInterval(() => {
        console.log(computerChord[pattern[i]])
        synth.triggerAttackRelease(computerChord[pattern[i]], '8n')
        button = document.getElementById(animationIndex[pattern[i]].slice(5))
        console.log(button)
        button.classList.remove(animationIndex[pattern[i]])
        void button.offsetWidth
        console.log('add ani')
        button.classList.add(animationIndex[pattern[i]])
        i++
        if (i >= pattern.length) {
            clearInterval(play)
            setTimeout(function () {
                console.log("controller on")
                messageToPlayer("GO!", 400)
                disableControl = false //reengauge controller functionality
            }, 300)
        }
    }, speed)
}

//***********************  GAME LOGIC  **************************************
// compare the pattern with the user input
let check = 0
function comparePatterns() {
    if (userArr[check] !== pattern[check]) {
        console.log("You Lose")
        check = 0
        lose()
    }
    else if (userArr.length === pattern.length) {
        console.log("You Win!... this round")
        check = 0
        win()
    }
    else {
        console.log("correct")
        updateScore()
        check++
    }
}

// create win state
function win() {
    userArr = []
    messageToPlayer("SUCCESS")
    roundStart()
}

// create lose state
function lose() {
    messageToPlayer("YOU LOSE", 10000)
    pattern = []
    userArr = []
    checkHighscore()
    round = 0
    score = 0
    playGame.style.cursor = "default"
    playing = false
    playGame.style.display = "inline-block"
}

// create a way to inform the player of game que
function messageToPlayer(message, duration = 1000) {
    messageBox.textContent = message
    console.log(messageBox.textContent)
    messageBox.style.display = "inline-block"
    setTimeout(() => {
        console.log(message)
        messageBox.style.display = "none"
    }, duration)
}

//set score and round on display bar
let score = 0
let round = 0
function updateDisplay() {
    updateScore(true)
    round++
    roundBox.textContent = round
}
function updateScore(roundEnd = false) {
    if (roundEnd && round) {
        if (round <= 5) { score += 50 } //round 1-5
        else if (round <= 10) { score += (round * 10) } // round 6-10
        else { score += (round * 20) } // round 10-inf
    } else if (round) {
        score += pattern.length
    }
    scoreBox.textContent = score
}

// Check if they got a highscore
let highscore = 0
function checkHighscore() {
    if (score > highscore) {
        highscoreBox.textContent = score
        highscore = score
    }
}

//round inititor and sequencer
function roundStart() {
    console.log('controller off')
    disableControl = true
    updateDisplay()
    setTimeout(() => {
        console.log("round start")
        createPattern()
        //reengauge controller at end of playPattern funtion
        if (round <= 5) { playPattern() } //round 1-5
        else if (round <= 10) { playPattern(350) } // round 6-10
        else { playPattern(270) } // round 10-inf
    }, 500)
}

// "play game button" initializer
let playing = false
playGame.addEventListener("click", () => {
    if (playing) {
        console.log("already playing")
        return
    }
    else {
        messageToPlayer("READY?")
        roundStart()
        playGame.style.cursor = "default"
        playing = true
        playGame.style.display = "none"
    }
})