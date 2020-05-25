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
    instrumentSounds = new Sounds(this);
    minimumPoints = 10;
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
            this.minimumPoints = 14;
            this.pushSpeed = 1800;
            this.distance = 6;
        } else if (this.difficulty === "hard") {
            this.minimumPoints = 16;
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
        }, 20000);
    }

    collisionDetection($checkbox, $drum) {
        let sq1 = {
            y: $checkbox.offsetTop,
            height: $checkbox.offsetHeight,
        };
        let sq2 = {
            y: $drum.offsetTop,
            height: $drum.offsetHeight,

        };
        if (sq2.y > sq1.y && sq2.y + sq2.height < sq1.y + sq1.height) {
            return true;
        } else {
            return false;
        }
    }


    collisionDetectionLeft($checkbox, $note) {
        let sq1 = {
            x: $checkbox.offsetLeft,
            width: $checkbox.offsetWidth,
        };
        let sq2 = {
            x: $note.offsetLeft,
            width: $note.offsetWidth,

        };
        if (sq2.x > sq1.x && sq2.x < sq1.x + sq1.width) {
            return true;
        } else {
            return false;
        }
    }

    collisionDetectionRight($checkbox, $note) {
        let sq1 = {
            x: $checkbox.offsetLeft,
            width: $checkbox.offsetWidth,
        };
        let sq2 = {
            x: $note.offsetLeft,
            width: $note.offsetWidth,

        };
        if (sq2.x + sq2.width > sq1.x && sq2.x + sq2.width < sq1.x + sq1.width) {
            return true;
        } else {
            return false;
        }
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