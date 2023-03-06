class Game {



    constructor(players, messenger) {
        this.players = players;
        this.messenger = messenger;
    }

    current = 0;



    getNext = i => {
        const n = this.players.length;
        if (i >= n) throw `wrong index arg:${i}`
        return ++i == n ? 0 : i;
    }

    nextIndex = (index) => {
        const n = this.players.length;
        var i = index ?? this.current;

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

    press(player, horse) {
        let indexPlayer = this.players.indexOf(player);
        let indexHorse = this.players.indexOf(horse);

        if (indexPlayer < 0) {
            console.error(`unknown player: ${player}`)
            console.log('players:'+this.players)
            return
        }
        if (indexHorse < 0) {
            console.error(`unknown horse: ${player}`)
            console.log('players:'+this.players)
            return
        }

        if (indexPlayer === this.nextIndex(indexHorse)) {
            this.messenger.win(player)
            this.stopped = true;
        } else {
            this.messenger.lock();
        }
    }
}

exports.Game = Game;