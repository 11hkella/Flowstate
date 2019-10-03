console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")

//      CONTROLLER
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", controller)
let playerDisbled = true
function controller(e) {
    if (playerDisbled) {
        return
    }
    if (e.keyCode === 70) {
        //remove then add class animation. THIS IS JS MAGIC
        buttonBlue.classList.remove("glow-blue")
        void buttonBlue.offsetWidth
        console.log('add anime')
        buttonBlue.classList.add("glow-blue")
        //
        bluePush()
        console.log(userArr)
        comparePatterns()
    }
    if (e.keyCode === 74) {
        buttonRed.classList.remove("glow-red")
        void buttonRed.offsetWidth
        console.log('add ani')
        buttonRed.classList.add("glow-red")
        redPush()
        console.log(userArr)
        comparePatterns()
    }
}

//      Click functionality
//blue button
// buttonBlue.addEventListener("click", (e) => {
//     console.log('click')
//     console.log('add anime')
//     buttonBlue.classList.add("glow-blue")

// })

//red button
// buttonRed.addEventListener("click", (e) => {
//     console.log('click')
//     console.log('add ani')
//     buttonRed.classList.add("glow-red")

// })


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

// Play pattern animation
const animationIndex = ["glow-blue", "glow-red"]

function playPattern() {
    let i = 0
    let buttonColor
    let play = setInterval(() => {
        buttonColor = animationIndex[pattern[i]].slice(5)
        console.log(buttonColor)
        document.getElementById(buttonColor).classList.add(animationIndex[pattern[i]])
        i++
        if (i >= pattern.length) {
            clearInterval(play)
            console.log("controller on")
            playerDisbled = false //reengauge controller functionality
        }
    }, 1050)
}

// GAME LOGIC
//randomly generated array 
let patternCount = 1
let pattern = []
function createPattern() {
    for (let i = 0; i < patternCount; i++) {
        pattern.push(Math.floor(Math.random() * 2))
    }
}

// Create array from user inputs
let userArr = []
function bluePush() { userArr.push(0) }
function redPush() { userArr.push(1) }

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
    pattern = []
    userArr = []
    patternCount++
    roundStart()
}
// create lose state
function lose() {
    pattern = []
    userArr = []
    patternCount = 1
}

//Game loop
function roundStart() {
    //disengauge controller functionality
    console.log('controller off')
    playerDisbled = true
    //
    console.log("round start")
    createPattern()
    playPattern() //reengauge controller at end of this funtion
}
roundStart()