
const {Server} =require("socket.io")
const {Game,Player}=require("./src/game")

const playerServer = new Server(3000);
const controlServer = new Server(3001);

const game=new Game();

players=function(){
    const arr=[]
    for (var socket of playerServer.sockets){
        const player=new Player((event)=>socket.onGameEvent(event,player));       
        arr.push(player) 
    }
    return arr;
}


playerServer.on("connection", socket => {

    console.log("client connected")

    socket.on("disconnect", reason=>{
        console.log("client disconnected:"+reason)
    })
})

controlServer.on("connection", socket=>{
    socket.on("game-start", ()=>{
        game.start(players())
    })

    socket.on("game-start", ()=>{
        game.stop()
    })
})

