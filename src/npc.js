engine.npc = {};




engine.npc.idleTime = 2500;
engine.npc.idleTimer = null;


engine.npc.list = [];

engine.npc.store = function(npcObj)
{
   engine.npc.list[npcObj.id] = npcObj;
};


engine.npc.isNpcAt = function(x, y)
{
   var i, len = engine.npc.list.length;

   for(i=0; i<len; i++)
   {
      if(engine.npc.list[i].x == x &&
         engine.npc.list[i].y == y)
      {
         return true;
      }
   }
   return false;
};


engine.npc.draw = function(id)
{
   var npc = engine.npc.list[id];
   var loc = engine.model.fixScreenLoc(npc.model, {x: engine.tileSize, y: engine.tileSize}); 

   var x = (npc.x * engine.tileSize) - (engine.viewport.x * engine.tileSize) + loc.x + engine.viewport.playerOffsetX;
   var y = (npc.y * engine.tileSize) - (engine.viewport.y * engine.tileSize) + loc.y + engine.viewport.playerOffsetY;

   engine.model.draw(npc.model, 6, x, y);
};


engine.npc.drawInViewport = function()
{
   var i, len = engine.npc.list.length;

   for(i=0; i<len; i++)
   {
      if(engine.viewport.isInside(engine.npc.list[i].x, engine.npc.list[i].y) === true)
      {
         engine.npc.draw(i);
      }
   }
};



engine.npc.checkIdle = function()
{
   var i, len = engine.npc.list.length;

   for(i=0; i<len; i++)
   {
      if(engine.npc.list[i].onidle)
      {
         engine.script.call(engine.npc.list[i].onidle, engine.npc.list[i]);
      }
   }
};




engine.npc.walk = function(npcID, dir)
{
   engine.output('NPC ' + npcID + ' walks ' + dir);

   var newx = engine.npc.list[npcID].x;
   var newy = engine.npc.list[npcID].y;

   switch(dir)
   {
      case 'left':   newx--;   break;
      case 'right':  newx++;   break;
      case 'up':     newy--;   break;
      case 'down':   newy++;   break;
   }

   var tile = engine.map.get(newx, newy);

   if(!engine.tile.hasProperty(tile, 'solid', 1) &&
   !engine.npc.isNpcAt(newx, newy))
   {
      engine.npc.list[npcID].x = newx;
      engine.npc.list[npcID].y = newy;
      engine.draw();
   }
};
