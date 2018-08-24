engine.script = {};



engine.script.list = [];


engine.script.call = function(id, context)
{
   var scriptstr = engine.script.list[id];
   
   eval("(function eval_csf(context){" + scriptstr + "})(" + JSON.stringify(context) + ");");
};


engine.script.store = function(scriptObj)
{
   engine.script.list[scriptObj.id] = scriptObj.data;
};

