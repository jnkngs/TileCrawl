engine.player = {};


engine.player.spriteIndex = 6;
engine.player.model       = 0;
engine.player.leftLeg     = false;
engine.player.speed       = 200;


engine.player.draw = function()
{
   var loc = engine.model.fixScreenLoc(engine.player.model, {x: engine.screen.width, y: engine.screen.height});

   engine.model.draw(engine.player.model, engine.player.spriteIndex, loc.x, loc.y);
};


engine.player.move = function(direction)
{
   var index, x, y;

   index = x = y = 0;

   engine.keyboard.canInput = false;

   switch(direction)
   {
      case 'up':	   index = 0;	y =  1;		break;
      case 'right':	index = 3;	x = -1;		break;
      case 'left':	index = 9;	x =  1;		break;
      case 'down':	index = 6;	y = -1;		break;
   }

   var toX = engine.viewport.x + (engine.screen.tilesX / 2 - 0.5) - x;
   var toY = engine.viewport.y + (engine.screen.tilesY / 2 - 0.5) - y;

   var toTile = engine.map.get(toX, toY);

   if(engine.tile.hasProperty(toTile, 'solid', 1) ||
      engine.npc.isNpcAt(toX, toY))
   {
      engine.keyboard.canInput = true;
   }else{
      engine.viewport.playerOffsetX = x * Math.ceil(5 / 16 * engine.tileSize);
      engine.viewport.playerOffsetY = y * Math.ceil(5 / 16 * engine.tileSize);

      setTimeout(engine.player.animate, engine.player.speed / 2);
      setTimeout(engine.player.reset, engine.player.speed);
   }

   engine.player.spriteIndex = index;
   engine.draw();
};


engine.player.animate = function()
{
   var x, y, px;

   x = y = 0;

   px = Math.ceil(11 / 16 * engine.tileSize);

   switch(engine.player.spriteIndex)
   {
      case 0:	y =  px;	break;
      case 3:	x = -px;	break;
      case 6:	y = -px;	break;
      case 9:	x =  px;	break;
   }

   engine.player.spriteIndex += (engine.player.leftLeg === true) ? 1 : 2;

   engine.player.leftLeg = !engine.player.leftLeg;

   engine.viewport.playerOffsetX = x;
   engine.viewport.playerOffsetY = y;

   engine.draw();
};


engine.player.reset = function()
{
   var index, x, y;

   x     = engine.viewport.x;
   y     = engine.viewport.y;
   index = 0;
   
   switch(engine.player.spriteIndex)
   {
      case 1:
      case 2:	y--;	index = 0;	break;

      case 4:
      case 5:	x++;	index = 3;	break;

      case 7:
      case 8:	y++;	index = 6;	break;

      case 10:
      case 11:	x--;	index = 9;	break;
   }

   engine.viewport.x = x;
   engine.viewport.y = y;

   engine.keyboard.canInput = true;

   engine.viewport.playerOffsetX = 0;
   engine.viewport.playerOffsetY = 0;

   engine.player.spriteIndex = index;

   engine.draw();

   var tileX = x + (engine.screen.tilesX / 2 - 0.5);
   var tileY = y + (engine.screen.tilesY / 2 - 0.5);

   var toTile = engine.map.get(tileX, tileY);

   if(engine.tile.hasProperty(toTile, 'onenter'))
   {
      var scriptID = toTile.onenter;
      engine.script.call(scriptID);
   }


   engine.animated.onscreen();
};


engine.player.activate = function()
{
   var x = engine.viewport.x + (engine.screen.tilesX / 2 - 0.5);
   var y = engine.viewport.y + (engine.screen.tilesY / 2 - 0.5);

   switch(engine.player.spriteIndex)
   {
      case 0: y--; break;
      case 3: x++; break;
      case 6: y++; break;
      case 9: x--; break;
   }

   var toTile = engine.map.get(x, y);

   if(engine.tile.hasProperty(toTile, 'onactivate'))
   {
      var scriptID = toTile.onactivate;
      engine.script.call(scriptID);
   }

   var i, len = engine.npc.list.length;

   for(i=0; i<len; i++)
   {
      if(engine.npc.list[i].x == x &&
         engine.npc.list[i].y == y &&
         engine.npc.list[i].onactivate)
      {
         var scriptID = engine.npc.list[i].onactivate;
         engine.script.call(scriptID);
      }
   }
};

