console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")
const buttonYellow = document.getElementById("yellow")
const buttonPurple = document.getElementById("purple")
const buttonGreen = document.getElementById("green")
const playGame = document.getElementById("playGame")
const messageBox = document.getElementById("messageBox")

//      USER
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", controller)
let playerDisbled = true
function controller(e) {
    if (playerDisbled) {
        return
    }
    if (e.keyCode === 70) { //f blue index:0
        controllerAnimation("glow-blue")
        push(0)
    }
    if (e.keyCode === 74) { // j red index:1
        controllerAnimation("glow-red")
        push(1)
    }
    if (e.keyCode === 67) { // c yellow index:2
        controllerAnimation("glow-yellow")
        push(2)
    }
    if (e.keyCode === 32) { // space purple index:3
        controllerAnimation("glow-purple")
        push(3)
    }
    if (e.keyCode === 77) { // m green index:4
        controllerAnimation("glow-green")
        push(4)
    }
}
// animator for keys
function controllerAnimation(aniKey) {
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

//      SIMON COMPUTER
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
function playPattern(speed = 400) {
    let i = 0
    let button;
    messageToPlayer("SIMON SAYS!", 300)
    let play = setInterval(() => {
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
                playerDisbled = false //reengauge controller functionality
            }, 300)
        }
    }, speed)
}

//      GAME LOGIC
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
    playGame.style.cursor = "default"
    playing = false
}

// create a way to inform the player of game info
function messageToPlayer(message, duration = 1000) {
    messageBox.textContent = message
    console.log(messageBox.textContent)
    messageBox.style.display = "inline-block"
    setTimeout(() => {
        console.log(message)
        messageBox.style.display = "none"
    }, duration)
}

//round inititor and sequencer
let challenge = false
function roundStart() {
    //disengauge controller functionality
    console.log('controller off')
    playerDisbled = true
    setTimeout(() => {
        console.log("round start")
        createPattern()
        if (challenge) {
            playPattern(250) //reengauge controller at end of this funtion
        }
        else { playPattern() }
    }, 500)
}

//"play game button"/initializer
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
    }
})