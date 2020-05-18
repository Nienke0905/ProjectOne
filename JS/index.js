//jshint esversion:6

let $board = document.querySelector(".board");
let $checkbox = document.querySelector("#checkbox");

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
    score = 0;
    start(){

        this.render();
    }
    render(){
        document.addEventListener("keydown", event => {
            this.notePressed.render(event.key);
          }); 
        setInterval(()=> {
            this.notes.push(new Note(this));
            },1000);
        setInterval(()=> {
        this.notes.forEach((note) => {
          note.render();
        })},50);
    }
    collisionDetection($dom1, $dom2) {
        let sq1 = {
            x: $dom1.offsetLeft,
            width: $dom1.offsetWidth,
        }
        let sq2 = {
            x: $dom2.offsetLeft,
            width: $dom2.offsetWidth,
        }
        if (sq2.x > sq1.x && sq2.x + sq2.width < sq1.x + sq1.width){
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
        if (this.game.collisionDetection($checkbox, this.$note)){
            if (this.$note.classList.contains($checkbox.innerHTML)){
                let yeah = new Audio(`sounds/${$checkbox.innerHTML}.mp3`);
                yeah.play();
                this.game.score += 1;
                document.querySelector("#scorepoints").innerHTML = this.game.score;
            } else {
                console.log("Booohooo");         
            }
        }
    }
    render(){
        this.$note.style.left = `${this.$note.offsetLeft - 10}px`;
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
          $checkbox.innerHTML = notePressed;
          this.game.notes.forEach((note) => {
             note.checking();
          });
        setTimeout(function(){
            $checkbox.innerHTML = "";
        },100);
    }
}

