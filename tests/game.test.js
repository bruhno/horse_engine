const { Game } = require("../src/game")

function get_players() {
    players = [];
    [1, 2, 3].forEach(p => players.push({
        id: p,
        horse: false,

        hideHorse() {
            this.horse = false
        },
        showHorse() {
            this.horse = true
        },
        win(){
            this.winner=true;
        },
        lock(){
            this.locked=true;
        }
    }))
    return players;
}


test("tree players", () => {
    // players = [];

    // [1, 2, 3].forEach(p => players.push({
    //     id: p,
    //     horse: false,
    //     hideHorse() {
    //         this.horse = false
    //     },
    //     showHorse: function () {
    //         this.horse = true
    //     }
    // }))

    players = get_players();

    var game = new Game(players)


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
    var game = new Game(players)

    game.jump();

    game.press(2);

    expect(players[2].winner).toBeTruthy();

    expect(()=> game.jump()).toThrow("stopped");
})

test("press button and miss", () => {
    players = get_players();
    var game = new Game(players)

    game.jump();

    players.forEach(p=>expect(p.locked).toBeFalsy())


    game.press(1);

    players.forEach(p=>expect(p.locked).toBeTruthy())

})


