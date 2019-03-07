// get cursor position
let cursorX;
let cursorY;
document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
};

let currentWeapon = 'pistol';

function game() {
    // DOM elements
    let bodyElement = document.getElementsByTagName("BODY")[0];
    let startElement = document.querySelector('.start');
    let areaElement = document.querySelector('.area');
    let bullets = document.querySelector('.bullets p');
    let bombs = document.querySelector('.bombs p');

    // load functions
    unloadScrollBars();
    setInterval(changeGunPosition, 100);
    // setInterval(backgroundSound, 10 * 1000);

    // welcome screen event on click enter
    let startWindow = function (event) {
        if ('Enter' === event.code) {
            startElement.classList.add('hide');
            playAudio('./sounds/start-sound.mp3');
            document.removeEventListener('keyup', startWindow);
        }
    };

    // welcome screen
    document.addEventListener('keyup', startWindow);

    // change weapon
    document.addEventListener('keyup', function (event) {
        let gunElement = document.querySelector('.gun');

        if ('Digit1' === event.code) {
            gunElement.innerHTML = ''; // clear previous weapon
            let rifleElement = document.createElement('div'); // create div for pistol
            rifleElement.classList.add('pistol'); // add class .pistol
            currentWeapon = 'pistol';
            gunElement.appendChild(rifleElement);
        } else if ('Digit2' === event.code) {
            gunElement.innerHTML = ''; // clear previous weapon
            let rifleElement = document.createElement('div'); // create fiv for rifle
            rifleElement.classList.add('rifle'); // add class .rifle
            currentWeapon = 'rifle';
            gunElement.appendChild(rifleElement);
        } else if ('Digit3' === event.code) {
            gunElement.innerHTML = ''; // clear previous weapon
            let rifleElement = document.createElement('div'); // create fiv for banana
            rifleElement.classList.add('banana'); // add class .banana
            currentWeapon = 'banana';
            gunElement.appendChild(rifleElement);
        } else if ('Digit4' === event.code) {
            bodyElement.style.opacity = 0;
            removeWhiteScreenAfterNukeBomb();
            console.log('DROP NUKE');
        }
    });

    // on shoot with left mouse
    document.addEventListener('click', function () {
        if ('pistol' === currentWeapon) {
            bullets.textContent -= 1; // remove bullets on shot with pistol
            playAudio('./sounds/gun-sound.wav');
        } else if ('rifle' === currentWeapon) {
            bullets.textContent -= 5; // remove 5 bullets on shot with AK-47
            playAudio('./sounds/rifle-sound.wav');
        } else if ('banana' === currentWeapon) {
            bullets.textContent = parseInt(bullets.textContent) + 50; // set GOD_mode with banana
            playAudio('./sounds/banana-sound.wav');
        }
    });
}

function playAudio(soundPath) {
    var audio = new Audio(soundPath);
    audio.play();
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

function changeGunPosition() {
    // change gun position on moving mouse
    let gunElement = document.querySelector('.gun');
    gunElement.style.marginLeft = cursorX + 'px';
}

function backgroundSound() {
    playAudio('./sounds/background-sound.wav');
}

function removeWhiteScreenAfterNukeBomb() {
    let bodyElement = document.getElementsByTagName("BODY")[0];
    bodyElement.style.opacity = 1;
}