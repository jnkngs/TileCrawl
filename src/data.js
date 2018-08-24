engine.data = {};



engine.data.load = function(dataFile, whendone)
{
   engine.data.request(dataFile, whendone);
};


engine.data.request = function(file, whendone)
{
   var handle = new XMLHttpRequest();

   if(handle.overrideMimeType)
   {
      handle.overrideMimeType('application/json');
   }

   handle.open('get', file, true);

   handle.addEventListener('readystatechange', function()
   {
      if(this.readyState == 4 && this.status != 404)
      {
         engine.data.parse(this.responseText, whendone);
      }
   }, false);

   handle.send(null);
};


engine.data.parse = function(response, whendone)
{
   var i, prop, json = JSON.parse(response.replace(/\n/g, '').replace(/\r/g, '')); 

   engine.map.defaultTile = json.defaultTile;
   engine.map.list[json.mapID] = json.map;

   for(prop in json)
   {
      for(i=0; i<json[prop].length; i++)
      {
         if(prop == 'tile' ||
            prop == 'model' ||
            prop == 'script' ||
            prop == 'npc' ||
            prop == 'animated')
         {
            engine[prop].store(json[prop][i]);
         }
      }
   };

   if(whendone)
   {
      whendone();
   }
};

