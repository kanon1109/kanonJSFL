//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
var layers = timeLine.layers;
var layerArray = timeLine.getSelectedLayers();
var layerCount = layers.length;
/**
增加帧数
**/
function addFrame(f)
{
	//fl.trace(layerArray[layerArray.length-1])
	//fl.trace(timeLine.layers[0].frames[0].duration)
	var frames = layers[layerArray[layerArray.length-1]].frames;
	var c = 0;
	var length = frames.length;
	for(var j = 0; j<length; j++)
	{
		if(f>0)
		{
			timeLine.insertFrames(f, false, c);
			c+=(f+1);
		}
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/增加帧面板.xml");
if(xmlpanel.dismiss == "accept")
{
	var frame = xmlpanel["frame"];
	frame = Number(frame);
	if(isNaN(frame)) alert("参数错误");
	addFrame(frame);
}
