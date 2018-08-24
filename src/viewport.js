engine.viewport = {};



engine.viewport.x = 0;
engine.viewport.y = 0;

engine.viewport.playerOffsetX = 0;
engine.viewport.playerOffsetY = 0;

engine.viewport.overflowTile = 2;


engine.viewport.set = function(x, y)
{
   var vx = x - (engine.screen.width  - engine.tileSize) / (engine.tileSize * 2);
   var vy = y - (engine.screen.height - engine.tileSize) / (engine.tileSize * 2);

   engine.viewport.x = vx;
   engine.viewport.y = vy;
};


engine.viewport.isInside = function(x, y)
{
   return x > (engine.viewport.x - engine.viewport.overflowTile) &&
          x < (engine.viewport.x + engine.screen.tilesX + engine.viewport.overflowTile) &&
          y > (engine.viewport.y - engine.viewport.overflowTile) &&
          y < (engine.viewport.y + engine.screen.tilesY + engine.viewport.overflowTile);
};
