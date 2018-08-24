engine.model = {};



engine.model.list = [];


engine.model.draw = function(model, spriteIndex, x, y)
{
   if(!engine.model.isLoaded(model))
   {
      engine.output('[model.draw] waiting for model load: ' + model);
      setTimeout(engine.player.draw, 100);
   }else{
      engine.handle.drawImage(engine.model.list[model][spriteIndex][0], x, y);
   }
};


engine.model.fixScreenLoc = function(id, base)
{
   var character = {
      width:  Math.ceil(engine.model.list[id][0][0].width),
      height: Math.ceil(engine.model.list[id][0][0].height)
   };

   var x = (base.x / 2) - (character.width / 2);
   var y = (base.y / 2) - (character.height) + (engine.tileSize / 2);

   return {x: Math.ceil(x), y: Math.ceil(y)};
};


engine.model.store = function(modelObj)
{
   var i, imgNames = ['n0', 'n1', 'n2', 'e0', 'e1', 'e2', 's0', 's1', 's2', 'w0', 'w1', 'w2'];
   var id = modelObj.id;
   var modelName = modelObj.name;

   engine.model.list[id] = [];

   for(i=0; i<12; i++)
   {
      engine.model.list[id][i] = [new Image(), false];

      engine.model.list[id][i][0].src = 'images/' + modelName + '/' + modelName + '_' + imgNames[i] + '.png';
      engine.model.list[id][i][0].onload = function(pid, pi)
      {
         return function()
         {
            engine.model.list[pid][pi][1] = true;
         }
      }(id, i);
   }
};


engine.model.isLoaded = function(id)
{
   var i;

   for(i=0; i<12; i++)
   {
      if(engine.model.list[id][i][1] === false)
      {
         return false;
      }
   }

   return true;
};


