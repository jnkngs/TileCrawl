window.addEventListener('load', function()
{
   engine.data.load('data/map1.json', function()
   {
      engine.viewport.set(2, 2);

      engine.map.set(0);

      engine.draw();

      engine.animated.setSpeed(engine.animated.speed);
      engine.npc.idleTimer = setInterval(engine.npc.checkIdle, engine.npc.idleTime);

      engine.keyboard.canInput = true;
   });
}, false);


window.addEventListener('keydown', engine.keyboard.parseInput, false);