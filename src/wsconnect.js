JUMP_INTERVAL = 500;
LOCK_INTERVAL = 10000;

const wsconnect = (socket) => {

    const num = counter++;
    socket.num = num;
    clients[num] = socket;



    console.log(`$client ${num} connected`);


    socket.on("message", data => {
        const message = data.toString();

        console.log(`${num}:${message}`);

        switch (message) {
            case "player":
                socket.role = "player";
                socket.send(`name:${num}`)
                admins({ event: "player-add", name: num })
                break;
            case "admin":
                socket.role = "admin";
                let names = [];
                players().forEach(p => names.push(p.num));
                socket.send(JSON.stringify({ event: "players", names }))
                break;
            case "start":
                startGame();
                break;
            case "stop":
                stopGame();
                break;
            case "button-click":
                buttonClick(num);
                break;

        }


    })

    socket.on("close", code => {
        let role =clients[num].role;

        delete clients[num];
        if (role === "player") {
            admins({ event: "player-remove", name: num })
        }
        console.log(`${role} ${num} disconnected with code ${code}`);
    })
}


const { Game } = require("./game")

function players(message) {
    let players = [];

    clients.forEach(c => {
        if (c.role === "player") {
            players.push(c)
            if (message) c.send(message);
        }
    });

    return players;
}


function admins(message) {
    let players = [];

    clients.forEach(c => {
        if (c.role === "admin") {
            players.push(c)
            if (message) c.send(JSON.stringify(message));
        }
    });



    return players;
}




function startGame() {
    let numbers = []

    players().forEach(p => numbers.push(p.num));

    if (numbers.length > 1) {
        game = new Game(numbers, gameMessenger());
        intervalID = setInterval(() => {
            if (game.stopped) {
                clearInterval(intervalID);
                return;
            }
            game.jump();
            console.log("horse jump")
        }, JUMP_INTERVAL);
    } else {
        console.error(`no players enough: ${numbers.length}`)
    }
}


function stopGame() {
    clearInterval(intervalID);
}


function buttonClick(num) {
    if (!game) {
        console.error('game is not started yet')
        return
    };
    game.press(num);
}

function gameMessenger() {
    return {
        hideHorse(num) {
            if (!clients[num]) return;
            clients[num].send("horse-hide");
        },
        showHorse(num) {
            if (!clients[num]) return;
            clients[num].send("horse-show");
            admins({ event: "horse", name: num })
        },
        lock() {
            players("button-lock")
            admins({ event: "button-lock" })
            console.log("locked")
            setTimeout(() => {
                players("button-unlock")
                admins({ event: "button-unlock" })
                console.log("unlocked")
            }, LOCK_INTERVAL);

        },
        win(num) {
            if (!clients[num]) return;
            clients[num].send("win");
            admins({ event: "win", name: num })
        }
    }
}

let intervalID;
let counter = 1;
let game = null;
let clients = [];

exports.wsconnect = wsconnect
