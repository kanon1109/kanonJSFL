var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();
fl.trace(fl.configDirectory);
function convertToSymbol(type,name,isRandom,start)
{
	var elements = this.initElementList();
	var elementsLength = elements.length;
	for(var i=0; i<elementsLength; i++)
	{
		var element = elements[i];
		var nameStr;
		element.selected = true;
		if(!isRandom)
		{
			nameStr = name + (start+i);
		}
		else
		{
			nameStr = name + (Math.floor(Math.random()*9000)+1000);
		}
		dom.convertToSymbol(type,nameStr,"top left");
		dom.selectNone();
	}
}

function initElementList()
{
	var f = timeline.currentFrame;
	var layers = timeline.layers;
	var layersLength = layers.length;
	var elementList = [];
	for(var i=0; i<layersLength; i++)
	{
		var layer = layers[i];
		var frames = layer.frames;
		var framesLength = frames.length;
		for(var j=0; j<framesLength; j++)
		{
			if(j!=f) continue;
			var frame = frames[j];
			var elements = frame.elements;
			var elementsLength = elements.length;
			for(var n=0; n<elementsLength; n++)
			{
				var element = elements[n];
				if(element.selected)
				{
					elementList.push(element);
					element.selected = false
				}
			}
		}
	}
	dom.selectNone();
	return elementList;
}

/**
选择类型
**/
function selectType(type)
{
	var t;
	switch(type)
	{
		case "影片剪辑":
			t = "movie clip";
		break;
		case "按钮":
			t = "button";
		break;
		case "图形":
			t = "graphic";
		break;
	}
	return t;
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/批量转换元件.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var type = xmlpanel["type"];
	type = this.selectType(type);
	fl.trace(["type",String(type)]);
	var name = xmlpanel["name"];
	fl.trace(name);
	var start = Number(xmlpanel["start"]);
	if(isNaN(start)) alert("参数错误");
	var str = xmlpanel["sortby"];
	var bool = str == "随机索引";
	fl.trace(str);
	this.convertToSymbol(type,name,bool,start);
}