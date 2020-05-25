//jshint esversion:6

class Sounds {
    constructor(game) {
        this.game = game;
    }
    playSound(key) {
        var instrument  = new Audio();
        var src1  = document.createElement("source");
        src1.type = "audio/mpeg";
        src1.src  = `sounds/${key}.mp3`;
        instrument.appendChild(src1);
        instrument.play();
    }
}