# horse_engine
ДОПОЛНЕНИЕ
------------------------
вводим сообщение "horse:name" на все клиенты
при нажатии на кнопку, клиент должен отсылать событие вместе с номером лошади "button-click:name"




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
horse:name
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
{ event: "horse",  name:value  }
{ event:"button-lock" }
{ event:"button-unlock" }
{ event:"win", name:value  }
</code>


FROM PLAYER TO ENGINE
----------------------
<code>
button-click:name
</code>

FROM ADMIN TO ENGINE
----------------------
<code>
start
stop 
</code>
