//jshint esversion:6

let $board = document.querySelector(".board");
let $checkbox = document.querySelector(".checkbox");
let $openTune = document.getElementById("opening-tune");


window.onload = () => {
    let startButtonEasy = document.querySelector('#easy');
    let startButtonMedium = document.querySelector('#medium');
    let startButtonHard = document.querySelector('#hard');
    startButtonEasy.addEventListener("click", function () {
        let game = new Game("easy");
        game.settings();
    });

    startButtonMedium.addEventListener("click", function () {
        let game = new Game("medium");
        game.settings();
    });

    startButtonHard.addEventListener("click", function () {
        let game = new Game("hard");
        game.settings();
    });

};

class Game {
    constructor(difficulty) {
        this.difficulty = difficulty;
        this.render = this.render.bind(this);
    }

    minimumPoints = 4;
    pushSpeed = 2400;
    distance = 3;
    notes = [new Note(this)];
    notePressed = new NotePressed(this);
    drums = [];
    drumPressed = new DrumPressed(this);
    score = 0;
    stopInterval = 0;
    newPushInterval = 0;
    timePressedArrow = 1;
    timePressedDrum = 1;

    settings() {
        if (this.difficulty === "medium") {
            this.minimumPoints = 8;
            this.pushSpeed = 1800;
            this.distance = 6;
        } else if (this.difficulty === "hard") {
            this.minimumPoints = 10;
            this.pushSpeed = 1500;
            this.distance = 10;
        }
        this.start();
    }

    start() {
        document.getElementById("winner").style.display = "none";
        document.getElementById("loser").style.display = "none";
        let startAudio = new Audio(`sounds/yeah.mp3`);
        $openTune.pause();
        startAudio.play();
        this.intervalClearing();
        document.addEventListener("keydown", event => {
            this.notePressed.render(event.key);
            this.drumPressed.render(event.key);
        });
    
        this.newPushInterval = setInterval(() => {
            this.notes.push(new Note(this));
            if (this.score > 1){
                this.drums.push(new Drum(this));
            }
        }, this.pushSpeed);

        this.render();
    }

    render() {

        this.notes.forEach((note) => {
            note.render();
        });

        this.drums.forEach((drum) => {
            drum.render();
        });

        requestAnimationFrame(this.render);
    }

    intervalClearing() {
        setTimeout(() => {
            clearInterval(this.newPushInterval);
            this.stop();
        }, 12000);
    }

    collisionDetection($dom1, $dom2) {
        let sq1 = {
            x: $dom1.offsetLeft,
            y: $dom1.offsetTop,
            width: $dom1.offsetWidth,
            height: $dom1.offsetHeight,
        };
        let sq2 = {
            x: $dom2.offsetLeft,
            y: $dom2.offsetTop,
            width: $dom2.offsetWidth,
            height: $dom2.offsetHeight,

        };
        if ((sq2.x > sq1.x && sq2.x + sq2.width < sq1.x + sq1.width) && (sq2.y > sq1.y && sq2.y + sq2.height < sq1.y + sq1.height)) {
            return true;
        } else {
            return false;
        }
    }


    collisionDetectionLeft($dom1, $dom2) {
        let sq1 = {
            x: $dom1.offsetLeft,
            width: $dom1.offsetWidth,
        };
        let sq2 = {
            x: $dom2.offsetLeft,
            width: $dom2.offsetWidth,

        };
        if (sq2.x > sq1.x && sq2.x < sq1.x + sq1.width) {
            return true;
        } else {
            return false;
        }
    }

    collisionDetectionRight($dom1, $dom2) {
        let sq1 = {
            x: $dom1.offsetLeft,
            width: $dom1.offsetWidth,
        };
        let sq2 = {
            x: $dom2.offsetLeft,
            width: $dom2.offsetWidth,

        };
        if (sq2.x + sq2.width > sq1.x && sq2.x + sq2.width < sq1.x + sq1.width) {
            return true;
        } else {
            return false;
        }
    }

    instrumentSound(keyPressed) {
        let audio = new Audio(`sounds/${keyPressed}.mp3`);
        audio.play();
    }

    stop() {
        setTimeout(function () {
            endscore();
        }, 5000);
        let endscore = () => {
            let endSound = "";
            if (this.score > this.minimumPoints) {
                endSound = new Audio(`sounds/winning.mp3`);
                document.getElementById("winner").style.display = "inline";
            } else {
                endSound = new Audio(`sounds/boo.mp3`);
                document.getElementById("loser").style.display = "inline";
            }
            endSound.play();
            $openTune.load();
        };
        setTimeout(function () {
            location.reload();
        }, 8000);
    }

}