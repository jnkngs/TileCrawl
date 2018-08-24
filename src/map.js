engine.map = {};



engine.map.defaultTile = null;

engine.map.list = [];

engine.map.current = -1;


engine.map.set = function(mapID)
{
   engine.map.current = mapID;
};


engine.map.get = function(x, y)
{
   if(engine.map.list[engine.map.current][y])
   {
      if(engine.map.list[engine.map.current][y][x])
      {
         return engine.map.list[engine.map.current][y][x];
      }
   }
   return undefined;
};


engine.map.draw = function(whatToDraw)
{
   var i, j, tile;

   var mapX = 0;
   var mapY = 0;

   var jMax = engine.screen.tilesY + engine.viewport.overflowTile;
   var iMax = engine.screen.tilesX + engine.viewport.overflowTile;

   for(j = -engine.viewport.overflowTile; j<jMax; j++)
   {
      for(i = -engine.viewport.overflowTile; i<iMax; i++)
      {
         mapX = i + engine.viewport.x;
         mapY = j + engine.viewport.y;


         tile = engine.map.get(mapX, mapY);


         if(whatToDraw == 'ground')
         {
            if(tile === undefined)
            {
               tile = engine.map.defaultTile;
            }

            engine.tile.draw(i, j, tile);
         }else
         if(whatToDraw == 'floating')
         {
            engine.tile.drawFloating(i, j, tile);
         }
      }
   }
};

