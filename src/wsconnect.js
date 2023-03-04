const wsconnect = (socket, request) => {
    const role = request.headers["game-role"];
    const num = counter++;
    socket.role = role;
    socket.num = num;



    clients[num] = socket;



    if (role === "player") {
        socket.send(`name:${num}`)
        admins({ event: "player-add", name: num })
    }

    if (role === "admin") {
        let names = [];
        socketPlayers().forEach(p => names.push(p.num));
        socket.send(JSON.stringify({ event: "players", names }))
    }

    console.log(`${role} ${num} connected`);


    socket.on("message", data => {
        const message = data.toString();

        console.log(`${num}:${message}`);

        switch (message) {
            case "start":
                startGame();
                break;
            case "stop":
                stopGame();
                break;

        }


    })

    socket.on("close", code => {
        delete clients[num];
        if (role === "player") {
            admins({ event: "player-remove", name: num })
        }
        console.log(`${role} ${num} disconnected with code ${code}`);
    })
}


const { Game } = require("./game")

function socketPlayers() {
    let players = [];

    clients.forEach(c => {
        if (c.role === "player") {
            players.push(c)
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
    let players = socketPlayers();

    if (players.length > 1) {
        game = new Game(players, gameMessenger());
        intervalID = setInterval(() => {
            game.jump();
            console.jog("horse jump")            
        }, 1000);
    } else {
        console.error("no players yet")
    }
}


function stopGame(){
    clearInterval(intervalID);
}


function gameMessenger(){
    return{
        hideHorse(num){
            clients[num].send("horse-hide");
        }
    }
}

let intervalID;
let counter = 1;
let game = null;
let clients = [];

exports.wsconnect = wsconnect