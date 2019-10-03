console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")

//      CONTROLLER
//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.keyCode === 70) {
        console.log('add anime')
        buttonBlue.classList.add("glow-blue")
        bluePush()
        console.log(userArr)
        comparePatterns()
    }
    if (e.keyCode === 74) {
        console.log('add ani')
        buttonRed.classList.add("glow-red")
        redPush()
        console.log(userArr)
        comparePatterns()
    }
})
//      Click functionality
//blue button
buttonBlue.addEventListener("click", (e) => {
    console.log('click')
    console.log('add anime')
    buttonBlue.classList.add("glow-blue")

})
buttonBlue.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonBlue.classList.remove("glow-blue")
});

//red button
buttonRed.addEventListener("click", (e) => {
    console.log('click')
    console.log('add ani')
    buttonRed.classList.add("glow-red")

})
buttonRed.addEventListener("webkitAnimationEnd", () => {
    console.log('remove anime')
    buttonRed.classList.remove("glow-red")
});

//      ANIMATION
// Play pattern animation
const animationIndex = ["glow-blue", "glow-red"]

function playPattern(arr) {
    let i = 0
    let buttonColor
    let play = setInterval(() => {
        buttonColor = animationIndex[arr[i]].slice(5)
        console.log(buttonColor)
        document.getElementById(buttonColor).classList.add(animationIndex[arr[i]])
        i++
        if (i >= arr.length) { clearInterval(play) }
    }, 1050)
}

// GAME LOGIC
//randomly generated array 
let patternCount = 1
const pattern = []
function createPattern() {
    for (let i = 0; i < patternCount; i++) {
        pattern.push(Math.floor(Math.random() * 2))
    }
}

// Create array from user inputs
const userArr = []
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
    patternCount++
}
// create lose state
function lose() {
    pattern = []
    patternCount = 1

}