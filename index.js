
// const {Game,Player}=require("./src/game")



// const game=new Game();

players=function(){
    const arr=[]
    for (var socket of playerServer.sockets){
        const player=new Player((event)=>socket.onGameEvent(event,player));       
        arr.push(player) 
    }
    return arr;
}


const ws = require("ws");
const disp = require("./src/wsconnect");



const server = new ws.Server({port:3000});
server.on("connection", disp.wsconnect)


