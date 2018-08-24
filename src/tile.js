engine.tile = {};


engine.tile.images = [];


engine.tile.draw = function(x, y, tile)
{
   var rx = x * engine.tileSize + engine.viewport.playerOffsetX;
   var ry = y * engine.tileSize + engine.viewport.playerOffsetY;

   engine.handle.drawImage(engine.tile.retrieve(tile.ground), rx, ry);

   if(engine.tile.hasProperty(tile, 'item'))
   {
      engine.handle.drawImage(engine.tile.retrieve(tile.item), rx, ry);
   }
};


engine.tile.drawFloating = function(x, y, tile)
{
   if(engine.tile.hasProperty(tile, 'floating'))
   {
      var rx = x * engine.tileSize + engine.viewport.playerOffsetX;
      var ry = y * engine.tileSize + engine.viewport.playerOffsetY;

      engine.handle.drawImage(engine.tile.retrieve(tile.floating), rx, ry);
   }
};

engine.tile.store = function(tileObj)
{
   var id = tileObj.id;
   var tile  = [id, new Image(), false];

   tile[1].src    = tileObj.src;

   tile[1].onload = function()
   {
      tile[2] = true;
   }

   engine.tile.images[id] = tile;
};


engine.tile.hasProperty = function(tile, prop, mustHaveValue)
{
   if(tile !== undefined && tile[prop] !== undefined)
   {
      if(mustHaveValue !== undefined)
      {
         return tile[prop] == mustHaveValue;
      }
      return true;
   }else{
      return false;
   }
};


engine.tile.retrieve = function(id)
{
   return engine.tile.images[id][1];
};


engine.tile.allLoaded = function()
{
   var i, len = engine.tile.images.length;

   for(i in engine.tile.images)
   {
      if(engine.tile.images[i][2] === false)
      {
         return false;
      }
   }  

   return true;
};

