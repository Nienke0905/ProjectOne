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
        this.$drum.style.top = (this.$drum.offsetTop + ((new Date() - this.startTime)/1000) * this.game.distance) +"px";
    }
}



class DrumPressed {
    constructor(game) {
        this.game = game;
    }

    render(key) {
        let drumPressed = key.toLowerCase();
        let drumArr = ["a", "d"];
        let rightOnePressed = false;

        if (drumArr.includes(drumPressed) && ((Date.now() - this.game.timePressedDrum )/1000 > 0.8)){
            this.game.timePressedDrum = Date.now();
            for (let x = 0; x < this.game.drums.length; x++) {
                rightOnePressed = this.game.drums[x].checking(drumPressed);
                if (rightOnePressed) {
                    this.game.score += 1;
                    document.querySelector("#scorepoints").innerHTML = this.game.score;
                    this.game.instrumentSound(drumPressed);
                    break;
                }
            }
            if (!rightOnePressed){
                this.game.instrumentSound("mutedGuitar");
                this.game.score -= 1;
                document.querySelector("#scorepoints").innerHTML = this.game.score;
            }  

        }

    }
}

