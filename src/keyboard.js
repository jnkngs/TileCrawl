engine.keyboard = {};



engine.keyboard.canInput = false;


engine.keyboard.getValue = function(key)
{
   switch(key)
   {
      case 'up':    return 38;
      case 'down':  return 40;
      case 'left':  return 37;
      case 'right': return 39;

      case 'a':     return 65;
   }
};


engine.keyboard.parseInput = function(event)
{
   if(engine.keyboard.canInput === true)
   {
      switch(event.keyCode)
      {
         case engine.keyboard.getValue('up'):
            engine.player.move('up');
            break;

         case engine.keyboard.getValue('down'):
            engine.player.move('down');
            break;

         case engine.keyboard.getValue('left'):
            engine.player.move('left');
            break;

         case engine.keyboard.getValue('right'):
            engine.player.move('right');
            break;

         case engine.keyboard.getValue('a'):
            engine.player.activate();
            break;
      }

   }
};

