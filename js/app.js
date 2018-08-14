// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // letiables applied to each of our instances go here,
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
    if (player.x < this.x + 40 &&
        player.x + 40 > this.x &&
        player.y < this.y + 30 &&
        30 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        score -= 0.5;
        gainLoosePoint.classList.add("sect");
        gainLoosePoint.innerHTML = '<text style="color:red"> Oh no, you just loose 0.5 score, try to avoid the bug</text>';
        setTimeout(function () {
            gainLoosePoint.classList.remove("sect");
            gainLoosePoint.innerText = randomValue();
            console.log(randomValue());
        }, 3000);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    //The image of the player of boy is added to the playing field 
    this.sprite = 'images/char-boy.png';
};

// This class requires an update(), render() and
Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, level);
};
// a handleInput() method.
Player.prototype.handleInput = function (keyPress) {

    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }

    // Enables user on up arrow key to move upwards on the y axis by 83
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
        if (this.y < 0) {
            level++;
            score += 5;
            gainLoosePoint.classList.add("sect");
            gainLoosePoint.innerText = 'Yeah!, way to go, +5 score added. You are a level up!';

            setTimeout(function () {
                gainLoosePoint.classList.remove("sect");
                gainLoosePoint.innerText = randomValue();
            }, 2500);
            console.log(level);
            console.log(randomValue());
            moreBugs(level);
        }
    }

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);

    }
};
function nextStep() {
    if (this.y < 0) {
        level++;
        score += 5;
        gainLoosePoint.classList.add("sect");
        gainLoosePoint.innerText = 'Yeah!, way to go, +5 score added. You are a level up!';

        setTimeout(function () {
            gainLoosePoint.classList.remove("sect");
            gainLoosePoint.innerText = randomValue();
        }, 2500);
        console.log(level);
        console.log(randomValue());
        moreBugs(level);
    }
}
// Function to display player's score
var displayScoreLevel = function (aScore, aLevel) {
    // add player score and level to div element created
    scoreLevelDiv.innerHTML = '<h3><span class="scoreLevel">Score: ' + aScore
        + '</span> <span class="scoreLevel">Level: ' + aLevel + '</span></h3>';
    document.body.firstElementChild.appendChild(scoreLevelDiv);//, firstCanvasTag[0]);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// All enemies are placed in an array
let level = 1;
let allEnemies = [];
let score = 0;
let scoreLevelDiv = document.createElement('div');
// Location of the 3 enemies on the y axis on the pavement
let enemyLocation = [63, 147, 230];
let gainLoosePoint = document.getElementById('msg');
let waitingArray = [
    "🤔..thinking...",
    "...you can do it 😉...",
    "🤪..Not bad at all...",
    "..ok 🤩, i believe in you...",
    "😏...this level shouldn't scare you...",
    "You are dong fine.. 😁",
    "..aim for a 😲higher score.."
];
let randomValue = function () {
    let me = waitingArray[Math.floor(Math.random() * waitingArray.length)];
    return me;
}
// For each enemy located on the y axis from 0 on the x axis move at a speed of 200 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// The starting location of the player is located at x=200, y=405
let player = new Player(202, 405);

let moreBugs = function (numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


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
        if (diffX > 0) {
            // swiped left
            console.log("swiped left");
            player.x -= 102;
        } else {
            // swiped right
            console.log("swiped right");
            player.x += 102;
        }
    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            console.log("swiped up");
            player.y -= 83;
            if (player.y < 0) {
                level++;
                score += 5;
                gainLoosePoint.classList.add("sect");
                gainLoosePoint.innerText = 'Yeah!, way to go, +5 score added. You are a level up!';

                setTimeout(function () {
                    gainLoosePoint.classList.remove("sect");
                    gainLoosePoint.innerText = randomValue();
                }, 2500);
                console.log(level);
                console.log(randomValue());
                moreBugs(level);
                setTimeout(() => {
                    player.x = 202;
                    player.y = 405;
                }, 800);
            }

        } else {
            // swiped down
            console.log("swiped down");
            player.y += 83;
        }
    }

    initialX = null;
    initialY = null;

    //e.preventDefault();
};