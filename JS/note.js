//jshint esversion:6

class Note {
    constructor(game) {
        this.game = game;
        let notesArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        let randomNote = notesArr[Math.floor(Math.random() * 4)];
        this.$note = document.createElement("img");
        this.$note.src = "images/" + randomNote + ".png";
        this.$note.setAttribute("class", "note");
        this.$note.classList.add(randomNote);
        let longNote = Math.floor(Math.random()*2);
        if (longNote === 1){
            this.$note.src = "images/long" + randomNote + ".png";
            this.$note.style.width = "350px";
        }
        $board.appendChild(this.$note);
    }
    startTime = new Date();

    checking(notePressed) {
        if ((this.game.collisionDetectionLeft($checkbox, this.$note)) && ((this.$note.classList.contains(notePressed)))) {
            return true;
        } else {
            return false;
        }
    }

    checkingEnd(notePressed) {
        if (this.game.collisionDetectionRight($checkbox, this.$note) && this.$note.classList.contains(notePressed)) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        this.$note.style.left = (this.$note.offsetLeft - ((new Date() - this.startTime)/1000) * this.game.distance) + "px";
    }

    animation(){
        if (this.$note.style.width === "350px"){
            this.$note.classList.add("rotate-center");

        }
    }
}

class NotePressed {
    constructor(game) {
        this.game = game;
    }

    render(key) {
        let notePressed = key;
        let notesArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

        if (notesArr.includes(notePressed) && ((Date.now() - this.game.timePressedArrow )/1000 > 0.8)){
            this.game.timePressedArrow = Date.now();
            let keyDownCorrect = false;
            for (let x = 0; x < this.game.notes.length; x++) {
                keyDownCorrect = this.game.notes[x].checking(notePressed);
                if (keyDownCorrect) {
                    let theNote = x;
                    keyDownCorrect = true;
                    window.onkeyup = (e) => {
                        if (this.game.notes[theNote].checkingEnd(e.key)) {
                            this.game.instrumentSounds.playSound(notePressed);
                            this.game.score += 1;
                            document.querySelector("#scorepoints").innerHTML = this.game.score;
                            this.game.notes[theNote].animation();
                        }
                    };
                    break;
                }                    
            }
            if (!keyDownCorrect){
                this.game.score -= 1;
                document.querySelector("#scorepoints").innerHTML = this.game.score;
                this.game.instrumentSounds.playSound("mutedGuitar");
            }
        }
    }
}

