const { Game } = require("../src/game")

function get_players() {
    players = [];
    [1, 2, 3].forEach(p => players.push({
        id: p,
        horse: false,


    }))
    return players;
}



test("tree players", () => {


    players = get_players();

    var game = new Game(players,messenger)


    expect(players[0].horse).toBeFalsy();
    expect(players[1].horse).toBeFalsy();
    expect(players[2].horse).toBeFalsy();


    game.jump();


    expect(players[0].horse).toBeFalsy();
    expect(players[1].horse).toBeTruthy();
    expect(players[2].horse).toBeFalsy();

    game.jump();


    expect(players[0].horse).toBeFalsy();
    expect(players[1].horse).toBeFalsy();
    expect(players[2].horse).toBeTruthy();

    game.jump();


    expect(players[0].horse).toBeTruthy();
    expect(players[1].horse).toBeFalsy();
    expect(players[2].horse).toBeFalsy();

})


test("press button and win", () => {
    players = get_players();
    var game = new Game(players,messenger)

    game.jump();

    game.press(2);

    expect(players[2].winner).toBeTruthy();

    expect(() => game.jump()).toThrow("stopped");
})

test("press button and miss", () => {
    players = get_players();
    var game = new Game(players,messenger)

    game.jump();

    // players.forEach(p => expect(p.locked).toBeFalsy())
    

    expect(messenger.locked).toBeFalsy()


    game.press(1);

    // players.forEach(p => expect(p.locked).toBeTruthy())
    expect(messenger.locked).toBeTruthy()

})



afterEach(()=>{
  messenger.locked=false;
})

///////////////////////////////
messenger = {

    locked:false,

    hideHorse(player) {
        player.horse = false
    },
    showHorse(player) {
        player.horse = true
    },
    win(player) {
        player.winner = true;
    },
    lock() {
        this.locked=true;
        //player.locked = true;
    }
}

