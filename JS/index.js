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

    minimumPoints = 7;
    pushSpeed = 2000;
    dropSpeed = 5;
    notes = [new Note(this)];
    notePressed = new NotePressed(this);
    drums = [new Drum(this)];
    drumPressed = new DrumPressed(this);
    score = 0;
    stopInterval = 0;
    newPushInterval = 0;

    settings() {
        if (this.difficulty === "medium") {
            this.minimumPoints = 12;
            this.pushSpeed = 1500;
            this.dropSpeed = 6;
        } else if (this.difficulty === "hard") {
            this.minimumPoints = 16;
            this.pushSpeed = 1200;
            this.dropSpeed = 8;
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
            this.drums.push(new Drum(this));
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
        }, 10000);
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
        }, 7000);
    
    }

}

class Note {
    constructor(game) {
        this.game = game;
        let notesArr = ["arrowUp", "arrowDown", "arrowLeft", "arrowRight"];
        let randomNote = notesArr[Math.floor(Math.random() * 4)];
        this.$note = document.createElement("img");
        this.$note.src = "images/" + randomNote + ".png";
        this.$note.setAttribute("class", "note");
        this.$note.classList.add(randomNote);
        $board.appendChild(this.$note);
    }

    startTime = new Date();


    checking(notePressed) {
        if (this.game.collisionDetection($checkbox, this.$note)) {
            if (this.$note.classList.contains(notePressed)) {
                return true;
            } else {
                return false;
            }
        }
    }

    render() {
        this.$note.style.left = (this.$note.offsetLeft - ((new Date() - this.startTime)/this.game.pushSpeed) * this.game.dropSpeed) + "px";
    }
}

class Drum {
    constructor(game) {
        this.game = game;
        let drumArr = ["a", "d"];
        let randomDrum = drumArr[Math.floor(Math.random() * 2)];
        this.$drum = document.createElement("img");
        this.$drum.src = "images/" + randomDrum + ".png";
        this.$drum.setAttribute("class", "drum");
        this.$drum.classList.add(randomDrum);
        $board.appendChild(this.$drum);
    }

    startTime = new Date();

    checking(drumPressed) {
        if (this.game.collisionDetection($checkbox, this.$drum)) {
            if (this.$drum.classList.contains(drumPressed)) {
                return true;
            } else {
                return false;
            }
        }
    }

    render() {
        this.$drum.style.top = (this.$drum.offsetTop + ((new Date() - this.startTime)/this.game.pushSpeed) * this.game.dropSpeed) +"px";
    }
}

class DrumPressed {
    constructor(game) {
        this.game = game;
    }

    render(key) {
        let drumPressed = key.toLowerCase();

        let drumArr = ["a", "d"];
        if (drumArr.includes(drumPressed)){
            let rightOnePressed = false;
        loop1:
            for (let x = 0; x < this.game.drums.length; x++) {
                let isInBox = this.game.drums[x].checking(drumPressed);
                if (isInBox) {
                    this.game.score += 1;
                    document.querySelector("#scorepoints").innerHTML = this.game.score;
                    rightOnePressed = true;
                    break loop1;
                }
            }
            if (rightOnePressed){
                this.game.instrumentSound(drumPressed);
            } else {
                this.game.instrumentSound("mutedGuitar");
            }
        } 
    }
}

class NotePressed {
    constructor(game) {
        this.game = game;
    }

    render(key) {
        let notePressed = "";
        switch (key) {
            case "ArrowRight":
                notePressed = "arrowRight";
                break;
            case "ArrowLeft":
                notePressed = "arrowLeft";
                break;
            case "ArrowDown":
                notePressed = "arrowDown";
                break;
            case "ArrowUp":
                notePressed = "arrowUp";
                break;
            default:
                break;
        }

        let notesArr = ["arrowUp", "arrowDown", "arrowLeft", "arrowRight"];
        if (notesArr.includes(notePressed)){
            let rightOnePressed = false;
            loop1:
            for (let x = 0; x < this.game.notes.length; x++) {
                let isInBox = this.game.notes[x].checking(notePressed);
                if (isInBox) {
                    this.game.score += 1;
                    document.querySelector("#scorepoints").innerHTML = this.game.score;
                    rightOnePressed = true;
                    this.game.instrumentSound(notePressed);
                    break loop1;
                }
            }
            if (rightOnePressed){
                this.game.instrumentSound(notePressed);
            } else {
                this.game.instrumentSound("mutedGuitar");
            } 
        }
    }
}
