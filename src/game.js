class Game {

    

    constructor(players, messenger) {
        this.players = players;
        this.messenger=messenger;
    }

    current = 0;

    

    getNext = i => {
        const n = this.players.length;
        if (i >= n) throw `wrong index arg:${i}`
        return ++i == n ? 0 : i;
    }

    nextIndex = () => {
        const n = this.players.length;
        var i = this.current;

        if (i >= n) throw `wrong index arg:${i}`
        return ++i == n ? 0 : i;
    }

    jump() {
        if (this.stopped) {
            console.error(`the game is stopped`)
            return
        }


        var previous = this.current;
        this.current = this.nextIndex();


        this.messenger.hideHorse(this.players[previous]);
        this.messenger.showHorse(this.players[this.current]);



    }

    press(player) {
        let index = this.players.indexOf(player);
        
        if (index<0) {
            console.error(`unknown player: ${player}`)
            return
        }
                
        if (index === this.nextIndex()) {
            this.messenger.win(this.players[index])
            this.stopped=true;
        }else{
            this.messenger.lock();
        }
    }
}

exports.Game = Game;