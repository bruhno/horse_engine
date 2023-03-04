//const {Player}=require("./player")

class Game {

    constructor(players) {
        this.players = players;
    }

    current = 0;



    getNext = i => {
        const n = players.length;
        if (i >= n) throw `wrong index arg:${i}`
        return ++i == n ? 0 : i;
    }

    nextIndex = () => {
        const n = players.length;
        var i = this.current;

        if (i >= n) throw `wrong index arg:${i}`
        return ++i == n ? 0 : i;
    }

    jump() {
        if (this.stopped) throw "the game is stopped";


        var previous = this.current;
        this.current = this.nextIndex();


        players[previous].hideHorse();
        players[this.current].showHorse();


    }

    press(index) {
        if (index === this.nextIndex()) {
            players[index].win();
            this.stopped=true;
        }else{
            players.forEach(p=>p.lock())
        }
    }
}

exports.Game = Game;