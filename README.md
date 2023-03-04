# horse_engine
HEADERS 
----------------------
PLAYER [game-role : player]
ADMIN  [game-role : admin]



FROM ENGINE TO PLAYER
----------------------
name:<value> 
horse-hide
horse-show
button-lock
button-unlock
win


FROM ENGINE TO ADMIN
----------------------
{ event: "players", names:[<value1>,<value2>...] }
{ event: "player-add", name:<value> }
{ event: "player-remove", name:<value> }
{ event: "horse", name: name:<value>  }
{ event:"button-lock" }
{ event:"button-unlock" }
{ event:"win", name:<value>  }


FROM PLAYER TO ENGINE
----------------------
button-click

FROM ADMIN TO ENGINE
----------------------
start
stop
