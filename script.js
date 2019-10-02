console.log("here here!")
//      POINTERS
const buttonBlue = document.getElementById("blue")
const buttonRed = document.getElementById("red")

//      ANIMATION

//      All buttons with keyCode controller
document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.keyCode === 70) {
        console.log('add anime')
        buttonBlue.classList.add("glow-blue")
        bluePush()
        console.log(userArr)
    }
    if (e.keyCode === 74) {
        console.log('add ani')
        buttonRed.classList.add("glow-red")
        redPush()
        console.log(userArr)
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

// GAME LOGIC

//randomly generated array 
const randomButton = () => { return Math.floor(Math.random() * 2) }
let pattern = [randomButton()]
const addMove = () => { pattern.push(randomButton()) }

console.log(pattern)
addMove()
console.log(pattern)
addMove()
console.log(pattern)

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

playPattern(pattern)

// Create array from user inputs
const userArr = []
function bluePush() { userArr.push(0) }
function redPush() { userArr.push(1) }

function comparePatterns() {

}