console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")
const buttonYellow = document.getElementById("yellow")
const buttonPurple = document.getElementById("purple")
const buttonGreen = document.getElementById("green")
const playGame = document.getElementById("playGame")
const messageBox = document.getElementById("messageBox")

//      CONTROLLER
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", controller)
let playerDisbled = true
function controller(e) {
    if (playerDisbled) {
        return
    }
    else if (e.keyCode === 70) { //f blue index:0
        //remove then add class animation. THIS IS JS MAGIC
        buttonBlue.classList.remove("glow-blue")
        void buttonBlue.offsetWidth
        console.log('add anime')
        buttonBlue.classList.add("glow-blue")
        //
        push(0)
    }
    else if (e.keyCode === 74) { // j red index:1
        buttonRed.classList.remove("glow-red")
        void buttonRed.offsetWidth
        console.log('add ani')
        buttonRed.classList.add("glow-red")
        push(1)
    }
    else if (e.keyCode === 67) { // c yellow index:2
        buttonYellow.classList.remove("glow-yellow")
        void buttonYellow.offsetWidth
        console.log('add ani')
        buttonYellow.classList.add("glow-yellow")
        push(2)
    }
    else if (e.keyCode === 32) { // space purple index:3
        buttonPurple.classList.remove("glow-purple")
        void buttonPurple.offsetWidth
        console.log('add ani')
        buttonPurple.classList.add("glow-purple")
        push(3)
    }
    else if (e.keyCode === 77) { // m green index:4
        buttonGreen.classList.remove("glow-green")
        void buttonGreen.offsetWidth
        console.log('add ani')
        buttonGreen.classList.add("glow-green")
        push(4)
    }
}

//      PATTERN ANIMATION
// add event listeners to remove class after animation ends
buttonBlue.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonBlue.classList.remove("glow-blue")
})
buttonRed.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonRed.classList.remove("glow-red")
})
buttonYellow.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonYellow.classList.remove("glow-yellow")
})
buttonPurple.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonPurple.classList.remove("glow-purple")
})
buttonGreen.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonGreen.classList.remove("glow-green")
})

// Play pattern animation
const animationIndex = ["glow-blue", "glow-red", "glow-yellow", "glow-purple", "glow-green"]

function playPattern() {
    let i = 0
    let button;
    messageToPlayer("GO!", 300)
    let play = setInterval(() => {
        button = document.getElementById(animationIndex[pattern[i]].slice(5))
        console.log(button)
        button.classList.remove(animationIndex[pattern[i]])
        void button.offsetWidth
        console.log('add ani')
        buttonGreen.classList.add(animationIndex[pattern[i]])
        i++
        if (i >= pattern.length) {
            clearInterval(play)
            setTimeout(function () {
                console.log("controller on")
                playerDisbled = false //reengauge controller functionality
            }, 800)
        }
    }, 850)
}

// GAME LOGIC
//randomly generated array 
let patternCount = 1
let pattern = []
function createPattern() {
    for (let i = 0; i < patternCount; i++) {
        pattern.push(Math.floor(Math.random() * 5))
    }
}

// Create array from user inputs
let userArr = []
function push(iButton) {
    userArr.push(iButton)
    console.log(userArr)
    comparePatterns()
}

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
    if (false) { // create a challenge boolean to switch between challenge 
        pattern = []
        userArr = []
        patternCount++
        messageToPlayer("SUCCESS")
        roundStart()
    }
    else {
        userArr = []
        messageToPlayer("SUCCESS")
        roundStart()
    }
}
// create lose state
function lose() {
    messageToPlayer("YOU LOSE", 10000)
    pattern = []
    userArr = []
    patternCount = 1
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

//Game loop
function roundStart() {
    //disengauge controller functionality
    console.log('controller off')
    playerDisbled = true
    setTimeout(() => {
        console.log("round start")
        createPattern()
        playPattern() //reengauge controller at end of this funtion
    }, 500)
}

//play game button
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