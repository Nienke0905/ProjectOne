class Sounds {
    constructor(game) {
        this.game = game;
        this.ArrowDown =`sounds/ArrowDown.mp3`;
        this.ArrowUp =`sounds/ArrowUp.mp3`;
        this.ArrowLeft =`sounds/ArrowLeft.mp3`;
        this.ArrowRight =`sounds/ArrowRight.mp3`;
        this.a =`sounds/a.mp3`;
        this.d =`sounds/d.mp3`;
        this.mutedGuitar =`sounds/mutedGuitar.mp3`;
    }


    playSound(key) {
        var instrument  = new Audio();
        var src1  = document.createElement("source");
        src1.type = "audio/mpeg";
        src1.src = "";
        switch(key){
            case "ArrowDown":
                src1.src = this.ArrowDown;
                break;
            case "ArrowUp":
                src1.src = this.ArrowUp;
                break;
            case "ArrowLeft":
                src1.src = this.ArrowLeft;
                break;
            case "ArrowRight":
                src1.src = this.ArrowRight;
                break;
            case "a":
                src1.src = this.a;
                break;
            case "d":
                src1.src = this.d;
                break;
            case "mutedGuitar":
                src1.src = this.mutedGuitar;
                break;
        }

        instrument.appendChild(src1);
        instrument.play();
    }
}
