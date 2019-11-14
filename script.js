//console.log("here here!")
//      POINTERS
const gameboard = document.getElementsByClassName("game-board")[0]
const buttons = gameboard.querySelectorAll("button")
const playGame = document.getElementById("playGame")
const messageBox = document.getElementById("messageBox")
const scoreBox = document.getElementById("score")
const roundBox = document.getElementById("round")
const highscoreBox = document.getElementById("highscore")
const displayItems = document.querySelectorAll("#display-container > p")

//      SYNTH
const compSynth = new Tone.DuoSynth().toMaster()
const userSynth = new Tone.PolySynth().toMaster()

//      AUDIO FILES
const powerUp = new Audio("power-up.wav")
const explosion = new Audio("explosion.wav")
//***********  USER  *************************************************
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", controller)
let disableControl = true
function controller(e) {
    if (disableControl) {
        return
    }
    if (e.keyCode === 70) { //f blue index:0
        controllerAnimation("glow-blue", 0)
        push(0)
    }
    if (e.keyCode === 74) { // j red index:1
        controllerAnimation("glow-red", 1)
        push(1)
    }
    if (e.keyCode === 67) { // c yellow index:2
        controllerAnimation("glow-yellow", 2)
        push(2)
    }
    if (e.keyCode === 32) { // space purple index:3
        controllerAnimation("glow-purple", 3)
        push(3)
    }
    if (e.keyCode === 77) { // m green index:4
        controllerAnimation("glow-green", 4)
        push(4)
    }
}

// animator for keys
function controllerAnimation(aniKey, note) {
    userSynth.triggerAttackRelease(chord[note], '8n')
    let button = document.getElementById(aniKey.slice(5))
    //console.log(button)
    button.classList.remove(aniKey)
    void button.offsetWidth
    //console.log('add ani')
    button.classList.add(aniKey)
}

// Create array from user inputs
let userArr = []
function push(iButton) {
    if (playing) {
        userArr.push(iButton)
        //console.log(`player pushed ${iButton}`)
        comparePatterns()
    }
}

//****************  SIMON COMPUTER  **********************************
//randomly generated array 
let pattern = []
function createPattern() {
    let nextnum = Math.floor(Math.random() * 5)
    if (nextnum === pattern[pattern.length - 1] || nextnum === pattern[pattern.length - 2]) {
        //console.log('reset!!!!')
        pattern.push(Math.floor(Math.random() * 5))
    }
    else {
        pattern.push(nextnum)
    }
    //console.log(pattern)
}

// Play pattern animation
const animationIndex = ["glow-blue", "glow-red", "glow-yellow", "glow-purple", "glow-green"]
const chord = ["E4", "A3", "C#4", "F#3", "G#3"]
// const chord = ["C#4", "A#3", "G#4", "F#3", "F4"]
function playPattern(speed = 450) {
    let i = 0
    let button;
    messageToPlayer("NOW", 300)
    let play = setInterval(() => {
        // //console.log(chord[pattern[i]])
        compSynth.triggerAttackRelease(chord[pattern[i]], '8n')
        button = document.getElementById(animationIndex[pattern[i]].slice(5))
        // //console.log(button)
        button.classList.remove(animationIndex[pattern[i]])
        void button.offsetWidth
        button.classList.add(animationIndex[pattern[i]])
        i++
        if (i >= pattern.length) {
            clearInterval(play)
            setTimeout(function () {
                //console.log("controller on")
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
        //console.log("Not equal")
        explosion.play()
        startup()
        check = 0
        lose()
    }
    else if (userArr.length === pattern.length) {
        //console.log("You Win!... this round")
        check = 0
        win()
    }
    else {
        //console.log("correct")
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
    playing = false
    playGame.style.cursor = "pointer"
    playGame.style.display = "inline-block"
    pattern = []
    userArr = []
    round = 0
    checkHighscore()
    score = 0
    fail()
    messageToPlayer("YOU LOSE", 5000)
}

// create a way to inform the player of game que
function messageToPlayer(message, duration = 1000) {
    messageBox.textContent = message
    //console.log("display message")
    messageBox.style.display = "inline-block"
    setTimeout(() => {
        //console.log(message)
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
        if (round <= 5) { score += 500 } //round 1-5
        else if (round <= 10) { score += (round * 300) } // round 6-10
        else { score += (round * 1000) } // round 10-inf
    } else if (round) {
        score += (pattern.length * 10)
    }
    scoreBox.textContent = score
}

// Check if they got a highscore
let highscore = localStorage.getItem("highscore") || 0
checkHighscore()
function checkHighscore() {
    if (score > highscore) {
        highscore = score
        localStorage.setItem("highscore", highscore)
    }
    highscoreBox.textContent = highscore
}
//**********************************  INITIALIZERS ******************************/
//round inititor and sequencer
function roundStart() {
    //console.log('controller off')
    disableControl = true
    updateDisplay()
    setTimeout(() => {
        //console.log("round start")
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
        //console.log("already playing")
        return
    }
    else {
        powerUp.play()
        disableControl = true
        startup()
        playGame.style.cursor = "default"
        playGame.style.display = "none"
        setTimeout(() => {
            messageToPlayer("READY?")
            roundStart()
            playing = true
        }, 700)
    }
})

// "Play Game button" hover animation cancel
playGame.addEventListener("mouseenter", () => {
    playGame.classList.remove("playGame")
})
playGame.addEventListener("mouseout", () => {
    playGame.classList.add("playGame")
})

// button border glow startup animation
function startup() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("start-up")
    }
    for (let i = 0; i < displayItems.length; i++) {
        displayItems[i].classList.toggle("start-up-display")
    }
}
//button fail animation when user inputs wrong value
function fail() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("fail")
    }
    for (let i = 0; i < displayItems.length; i++) {
        displayItems[i].classList.toggle("fail")
    }
    setTimeout(() => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle("fail")
        }
        for (let i = 0; i < displayItems.length; i++) {
            displayItems[i].classList.toggle("fail")
        }
    }, 300)

}

// fade in page
document.body.classList.remove("fade")

// play background noise
// const spaceWind = new Audio("space-wind.wav")
// spaceWind.volume = 0.7
// spaceWind.loop = true
// spaceWind.play()