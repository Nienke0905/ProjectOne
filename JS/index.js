//jshint esversion:6

let $board = document.querySelector(".board");
let $checkboxGuitar = document.querySelector("#guitar");
let $checkboxDrum = document.querySelector("#drum");


window.onload = () => {
    let startButton = document.getElementById('start-button');
    startButton.addEventListener("click", function() {
        let game = new Game();
        game.start();
    });
};

class Game {
    notes = [new Note(this)];
    notePressed = new NotePressed(this);
    drums = [new Drum(this)];
    drumPressed = new DrumPressed(this);
    score = 0;
    start(){
        this.render();
    }

    render(){
        document.addEventListener("keydown", event => {
            this.notePressed.render(event.key);
            this.drumPressed.render(event.key);
          }); 
        setInterval(()=> {
            this.notes.push(new Note(this));
            this.drums.push(new Drum(this));
            },1500);

            
        setInterval(()=> {
        this.notes.forEach((note) => {
          note.render();
        });
        this.drums.forEach((drum)=> {
            drum.render();
        });
        },50);
    }
    collisionDetection($dom1, $dom2) {
        let sq1 = {
            x: $dom1.offsetLeft,
            y: $dom1.offsetTop,
            width: $dom1.offsetWidth,
            height: $dom1.offsetHeight,
        }
        let sq2 = {
            x: $dom2.offsetLeft,
            y: $dom2.offsetTop,
            width: $dom2.offsetWidth,
            height: $dom2.offsetHeight,

        }
        if ((sq2.x > sq1.x && sq2.x + sq2.width < sq1.x + sq1.width) && (sq2.y > sq1.y && sq2.y + sq2.height < sq1.y + sq1.height)) {
            return true;
        } else {
            return false;
        }
    }
}

class Note {
    constructor(game){
        this.game = game;
        let notesArr = ["arrowUp","arrowDown","arrowLeft","arrowRight"];
        let randomNote = notesArr[Math.floor(Math.random()*4)];
        this.$note = document.createElement("img");
        this.$note.src = "images/"+randomNote+".png";
        this.$note.setAttribute("class","note");
        this.$note.classList.add(randomNote);
        $board.appendChild(this.$note);
    }
    checking(){
        if (this.game.collisionDetection($checkboxGuitar, this.$note)){
            if (this.$note.classList.contains($checkboxGuitar.innerHTML)){
                return true;
            } else {
                return false;        
            }
        } 
    }
    render(){
        this.$note.style.left = `${this.$note.offsetLeft - 10}px`;
    }
}

class Drum {
    constructor(game){
        this.game = game;
        let drumArr = ["a","d"];
        let randomDrum = drumArr[Math.floor(Math.random()*2)];
        this.$drum = document.createElement("img");
        this.$drum.src = "images/"+randomDrum+".png";
        this.$drum.setAttribute("class","drum");
        this.$drum.classList.add(randomDrum);
        $board.appendChild(this.$drum);
    }
    checking(){
        if (this.game.collisionDetection($checkboxDrum, this.$drum)){
            if (this.$drum.classList.contains($checkboxDrum.innerHTML)){
                return true;
            } else {
                return false;        
            }
        } 
    }
    render(){
        this.$drum.style.top = `${this.$drum.offsetTop + 10}px`;
    }
}

class DrumPressed {
    constructor(game){
        this.game = game;
    }
    render(key){
        let drumPressed = "";
        switch (key.toLowerCase()) {
            case "d":
                drumPressed = "d";
                break;
            case "a":
                drumPressed = "a";
                break;
            default:
                break;
                
        }

        $checkboxDrum.innerHTML = drumPressed;
        loop1:
        for (let x=0; x<this.game.drums.length; x++){
            let isInBox = this.game.drums[x].checking();
            if (isInBox){
                let drumAudio = new Audio(`sounds/${$checkboxDrum.innerHTML}.mp3`);
                drumAudio.play();
                this.game.score += 1;
                document.querySelector("#scorepoints").innerHTML = this.game.score;
                break loop1;
            }
        }
        setTimeout(function(){
            $checkboxDrum.innerHTML = "";
        },100);

    }
}

class NotePressed {
    constructor(game){
        this.game = game;
    }
    render(key){
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


        $checkboxGuitar.innerHTML = notePressed;
        // let audio = new Audio(`sounds/boo.mp3`);

        loop1:
        for (let x=0; x<this.game.notes.length; x++){
            let isInBox = this.game.notes[x].checking();
            if (isInBox){
                let audio = new Audio(`sounds/${$checkboxGuitar.innerHTML}.mp3`);
                audio.play();
                this.game.score += 1;
                document.querySelector("#scorepoints").innerHTML = this.game.score;
                break loop1;
            }
        }
        setTimeout(function(){
            $checkboxGuitar.innerHTML = "";
        },100);
        
    }
}