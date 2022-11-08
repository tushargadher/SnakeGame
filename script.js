//declaring const and varible
let box = document.querySelector('.box');
let inputDir = { x: 0, y: 0 };
const Bgmusic = new Audio('Bgmusic.mp3');
const foodEat = new Audio('FoodEat.wav');
const MoveSound = new Audio('move.mp3');
const gameoverSound = new Audio('gameoverSound.wav');

let lastPainttime = 0;
let speed = 4;
let score = 0;
let check = false;
let snakeArr = [//it is a array of object
    { x: 13, y: 15 },

]
food = { x: 10, y: 6 };



//function section 

function main(currTime) {

    window.requestAnimationFrame(main);
    if ((currTime - lastPainttime) / 1000 < (1 / speed)) {
        return;//if this condition become true then the function got terminated.. else the gameEngine callad..
    }
    //you may be woundering how we do this complex culcating insted of just using setInverval method. ans is on below comment.
    lastPainttime = currTime;
    gameEngine();
}
function isCollide(sArr) {
    //if the snake bump into self
    for (let i = 1; i < snakeArr.length; i++) {
        if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
            return true;
        }
    }
    //if the snake bump into wall
    if (sArr[0].x > 20 || sArr[0].x < 0 || sArr[0].y > 20 || sArr[0].y < 0) {
        return true;
    }
}
function gameEngine() {
    //if gameover this then
    if (isCollide(snakeArr)) {
        //set highscore in localStorage
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("hiscore", JSON.stringify(highscore));
            document.querySelector('.Highscore').innerText = `HighScore :${highscore} `;
        }
        gameoverSound.play();
        document.querySelector('.container').style.filter = "blur(3px)";
        document.querySelector('.gameoverAlert').style.visibility = 'visible';
        document.querySelector('.FinalScore').innerText = `Your Score : ${score}`;
        inputDir = { x: 0, y: 0 };
        // alert('Game Over Press any key to counitue');
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //if the food is eaten then increase the score and regenrate the food
    // console.log(`Head Position x: ${snakeArr[0].x} and Y : ${snakeArr[0].y}`);

    // console.log(`Food Position x ${food.x}`);
    // console.log(`food Position y ${food.y}`);


    // function checkFoodPos() {
    //     for (let i = 1; i < snakeArr.length; i++) {
    //         if (food.x != snakeArr[i].x && food.y != sArr[i].y) {
    //             return true;
    //         }
    //     }
    // }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {//if both snake and food at same location 

        foodEat.play();

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); //unshif method add element at the begging of the array
        a = 1;
        b = 20;
        food = { x: Math.round((a + (b - a) * Math.random())), y: Math.round(a + (b - a) * Math.random()) };//new position of food



        score += 1;
        document.querySelector('.scoreborad').innerText = `Score : ${score}`;
    }
    //moving the snake
    for (i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display the snake
    box.innerHTML = '';
    snakeArr.forEach((e, index) => {
        //create div element
        snakeElement = document.createElement('div');
        //set the position of snake
        snakeElement.style.gridRowStart = e.x;
        snakeElement.style.gridColumnStart = e.y;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);

    })

    //display the food
    foodElement = document.createElement('div');
    foodElement.classList.add('food');
    //set the position of snake
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    box.appendChild(foodElement);


}



//main logic start here
window.requestAnimationFrame(main);//we use this insted of settimeout and setinternal   
function virbate(){
    navigator.vibrate(10);
}
//note:-requestAnimationFrame is so useful is the fact that it gives you a time variable which you can use to calculate the amount of time between frames.


let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    highscore = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscore));
}
else {
    highscore = JSON.parse(hiscore);
    document.querySelector('.Highscore').innerText = `HighScore :${highscore} `;
}


//for desktop user use keyboard
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 0 }//start the game
    //later repeat the audio after audioduration is complete(by tomorrow 06/11/2022)
    // console.log(e.key);
    // snakeRunSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = -1;
            inputDir.y = 0;
            // document.querySelector('.head').style.transform = 'scaleY(-1)';
            MoveSound.play();
            break;
        case 'ArrowDown':

            inputDir.x = 1;
            inputDir.y = 0;
            // document.querySelector('.head').style.transform = 'scaleY(1)';
            MoveSound.play();
            break;
        case 'ArrowRight':

            inputDir.x = 0;
            inputDir.y = 1;
            // document.querySelector('.head').style.transform = 'rotate(270deg)';
            MoveSound.play();
            break;
        case 'ArrowLeft':

            inputDir.x = 0;
            inputDir.y = -1;
            // document.querySelector('.head').style.transform = 'rotate(90deg)';
            MoveSound.play();
            break;


            // window.location.href='https://www.instagram.com//';

            
    }

})

//for mobile device user which use in display btn to play game
up.addEventListener('click', () => {
    inputDir.x = -1;
    inputDir.y = 0;
    MoveSound.play();
});
down.addEventListener('click', () => {
    inputDir.x = 1;
    inputDir.y = 0;
    MoveSound.play();
});
right.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = 1;
    MoveSound.play();
})
left.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = -1;
    MoveSound.play();
})
