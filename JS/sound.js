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




// class Sounds {
//     constructor(game) {
//         this.game = game;
//         this.ArrowDown = new Audio (`sounds/ArrowDown.mp3`);
//         this.ArrowUp = new Audio(`sounds/ArrowUp.mp3`);
//         this.ArrowLeft = new Audio(`sounds/ArrowLeft.mp3`);
//         this.ArrowRight = new Audio(`sounds/ArrowRight.mp3`);
//         this.a = new Audio(`sounds/a.mp3`);
//         this.d = new Audio(`sounds/d.mp3`);
//         this.mutedGuitar = new Audio(`sounds/mutedGuitar.mp3`);
//     }


//     playSound(key) {
//         var instrument  = "";
//         switch(key){
//             case "ArrowDown":
//                 instrument = this.ArrowDown;
//                 break;
//             case "ArrowUp":
//                 instrument = this.ArrowUp;
//                 break;
//             case "ArrowLeft":
//                 instrument = this.ArrowLeft;
//                 break;
//             case "ArrowRight":
//                 instrument = this.ArrowRight;
//                 break;
//             case "a":
//                 instrument = this.a;
//                 break;
//             case "d":
//                 instrument = this.d;
//                 break;
//             case "mutedGuitar":
//                 instrument = this.mutedGuitar;
//                 break;
//         }
//         var src1  = document.createElement("source");
//         src1.type = "audio/mpeg";
//         instrument.appendChild(src1);
//         instrument.play();
//     }
// }
