# horse_engine

ONCONNECT
----------------------
after connected send client role to engine
<code>
  player
  admin
</code>


FROM ENGINE TO PLAYER
----------------------
<code>
name:value  
horse-hide
horse-show
button-lock
button-unlock 
win 
</code>
  

FROM ENGINE TO ADMIN
----------------------
<code>
{ event: "players", names:[value1,value2...] } 
{ event: "player-add", name:value }
{ event: "player-remove", name:value } 
{ event: "horse", name: name:value  }
{ event:"button-lock" }
{ event:"button-unlock" }
{ event:"win", name:value  }
</code>


FROM PLAYER TO ENGINE
----------------------
<code>
button-click
</code>

FROM ADMIN TO ENGINE
----------------------
<code>
start
stop 
</code>
