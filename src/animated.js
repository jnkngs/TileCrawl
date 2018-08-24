engine.animated = {};



engine.animated.list = [];

engine.animated.speed = 500;
engine.animated.timer = null;


engine.animated.setSpeed = function(speed)
{
   engine.animated.speed = speed;
   clearInterval(engine.animated.timer);

   engine.animated.timer = setInterval(function()
   {
      engine.animated.onscreen();
      engine.animated.animate();
   }, engine.animated.speed);
};


engine.animated.store = function(tileObj)
{
   engine.animated.list[tileObj.id] = tileObj;
};


engine.animated.animate = function()
{
   var tiles;

   for(tiles in engine.animated.list)
   {
      engine.script.call(engine.animated.list[tiles].script);
   }
};


engine.animated.onscreen = function()
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

         if(engine.tile.hasProperty(tile, 'onscreen'))
         {
            engine.script.call(tile.onscreen, engine.combineObjects(tile, {x: mapX, y: mapY, tx: i, ty: j}));
         }
      }
   }

   engine.player.draw();
   // NPC drawing here
   engine.map.draw('floating');
};

