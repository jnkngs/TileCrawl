var engine = {};

/**
 * var entityManager = new EntityManager();
 * -> function Engine() {
 *  ...
 * this.output = function(message) {---}
 * }
 */

engine.outhnd = document.getElementById('output');
engine.canvas = document.getElementById('canvas');
engine.handle = engine.canvas.getContext('2d');

engine.tileSize = 16;


engine.output = function(message)
{
   engine.outhnd.innerHTML = '<br />' + message + engine.outhnd.innerHTML;
};


engine.combineObjects = function(/* arguments */)
{
   var i, prop, len = arguments.length, nobj = {};

   for(i=0; i<len; i++)
   {
      for(prop in arguments[i])
      {
         nobj[prop] = arguments[i][prop];
      }
   }

   return nobj;
};


engine.draw = function()
{
   if(engine.tile.allLoaded() === false)
   {
      setTimeout(engine.draw, 100);
   }else{
      engine.map.draw('ground');
      engine.player.draw();
      engine.npc.drawInViewport();
      engine.map.draw('floating');
   }
};

