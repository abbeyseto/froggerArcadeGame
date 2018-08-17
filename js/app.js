"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
    // - Code to execute when all DOM content is loaded.
    // - including fonts, images, etc.
    modal.classList.add('show');
    var vid = document.getElementById("bgtrack");
    vid.autoplay = true;
    vid.load();
    vid.volume = 1;
});
let modal = document.querySelector('#pop1');
let modal2 = document.querySelector('#pop2');
let closeicon = document.querySelector(".close1");
let closeicon2 = document.querySelector(".close2");
let closeicon3 = document.querySelector(".continue");
// Now write your own player class
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    //The image of the player of boy is added to the playing field
    this.sprite = 'images/char-boy.png';
};
const player = new Player(202, 405);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let level = 1;
let allEnemies = [];
let score = 0;
let scoreLevelDiv = document.createElement('div');
// Location of the 3 enemies
let enemyLocation = [63, 147, 230];
let gainLoosePoint = document.getElementById('msg');
let winArray = [
    "🤔..thinking...",
    "...you can do it 😉...",
    "🤪..Not bad at all...",
    "..ok 🤩, i believe in you...",
    "😏...this level shouldn't scare you...",
    "You are doing fine.. 😁",
    "..aim for a 😲higher score.."
];
let randomValue = function () {
    let winString = winArray[Math.floor(Math.random() * winArray.length)];
    return winString;
}
// Enemies our player must avoid
const Enemy = function (x, y, speed) {
    // variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x > 510) {
        this.x = -90;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }


    // Check for collision with enemies or barrier-walls
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 50 &&
        50 + player.y > this.y) {
        player.reset();
        score -= 0.5;
        gainLoosePoint.classList.add("sect");
        gainLoosePoint.innerHTML = '<text style="color:red"> Oh no, you just loose 0.5 score, try to avoid the bugs</text>';
        setTimeout(function () {
            gainLoosePoint.classList.remove("sect");
            gainLoosePoint.innerText = randomValue();
            console.log(randomValue());
        }, 5000);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
Player.prototype.update = function (dt) {

};
Player.prototype.reset = function () {
    player.x = 202;
    player.y = 405;
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, level);
};
// a handleInput() method.
Player.prototype.handleInput = function (keyPress) {


    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }

    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
        if (this.y < 0) {
            nextLevel();
        }
    }

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    // returns player back to starting position when player reaches the water
    if (this.y < 0) {
        setTimeout(() => {
            player.reset();
        }, 800);

    }
};

// Function to display player's score
let displayScoreLevel = function (aScore, aLevel) {
    //call up congratulations modal when user reaches level 20 of the game and reset all progress values
    if (aLevel === 20) {
        allEnemies = [];
        level = 1;
        modal2.classList.add('show');
        document.getElementById('results').innerHTML = '<h3> Your final score is ' + aScore + '<br> Only few geniuses made it through the 20 Levels, you are one of them.</h3>'
        document.removeEventListener('keyup', pressedKeys);
        document.removeEventListener("touchstart", startTouch);
    }
    scoreLevelDiv.innerHTML = '<h3><span class="scoreLevel">Score: ' + aScore
        + '</span> <span class="scoreLevel">Level: ' + aLevel + '</span></h3><br><br><br> <h3>You have ' + (20 - aLevel) + ' Level(s) more to Victory!<h3>';
    document.body.firstElementChild.appendChild(scoreLevelDiv);
};

enemyLocation.forEach(function (locationY) {
    let enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405

let moreBugs = function (numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, 100+ Math.random() * 256);
        allEnemies.push(enemy);
    }
};

function nextLevel() {
    level++;
    score += 5;
    gainLoosePoint.classList.add("sect");
    gainLoosePoint.innerText = 'Yeah!, way to go, you gained 5 point. You are a level up!';

    setTimeout(function () {
        gainLoosePoint.classList.remove("sect");
        gainLoosePoint.innerText = randomValue();
    }, 2500);
    console.log(level);
    console.log(randomValue());
    moreBugs(level);
    setTimeout(() => {
        player.reset();
    }, 800);
}

function pressedKeys(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', pressedKeys);


document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {

    if (initialX === null) {
        return;
    }

    if (initialY === null) {
        return;
    }

    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;

    var diffX = initialX - currentX;
    var diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0 && player.x > 0) {
            // swiped left
            console.log("swiped left");
            player.x -= 102;
        } if (diffX < 0 && player.x < 405) {
            // swiped right
            console.log("swiped right");
            player.x += 102;
        }
    } else {
        // sliding vertically
        if (diffY > 0 && player.y > 0) {
            // swiped up
            console.log("swiped up");
            player.y -= 83;
            if (player.y < 0) {
                nextLevel();
            }

        } if (diffY < 0 && player.y < 405) {
            // swiped down
            console.log("swiped down");
            player.y += 83;
        }
    }

    initialX = null;
    initialY = null;

    //e.preventDefault();
};

closeicon.addEventListener("click", function (e) {
    modal.classList.remove('show');
});
closeicon2.addEventListener("click", function (e) {
    modal2.classList.remove('show');
    resetGame();
});
closeicon3.addEventListener("click", function (e) {
    modal.classList.remove('show');
});
function resetGame() {
    level = 1;
    score = 0;
    allEnemies = [];
    enemyLocation = [63, 147, 230];
    enemyLocation.forEach(function (locationY) {
        enemy = new Enemy(0, locationY, 200);
        allEnemies.push(enemy);
    });
    document.addEventListener('keyup', pressedKeys);
    document.addEventListener("touchstart", startTouch, false);
}