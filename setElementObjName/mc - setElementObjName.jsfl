//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
//---层---
var layers = timeLine.layers
var elementList;
/**
初始化元素数组
**/
function initElementList(flag)
{
	this.elementList = [];
	var f = timeLine.currentFrame;
	fl.trace(["当前帧",timeLine.currentFrame]);
	var layers = timeLine.layers;
	var layerLength = timeLine.layers.length;
	for(var i = 0; i < layerLength; i++)
	{
		//---当前层---
		var currentLayer = layers[i];
		//---当前层帧数组---
		var frames = currentLayer.frames;
		var frameLength = frames.length;
		for(var j = 0;j < frameLength; j++)
		{
			//---当前帧---
			if(j!=f) continue;
			var currentFrame = frames[j];
			//---当前帧原素数组---
			var elements = currentFrame.elements;
			var elementLength = elements.length;
			fl.trace(["元素个数",elementLength]);
			for(var n = 0; n < elementLength; n++)
			{
				var element = elements[n]
				//fl.trace(element.name);
				//fl.trace(element.elementType);
				var o = filterElement(element, "instance",flag);
				this.elementList.push(o);
			}
		}
	}
}

/**
过滤匹配类型的元素
**/
function filterElement(element,type,vertical)
{
	if(element.elementType == type && element.selected)
	{
		var o = {};
		var key;
		if(!vertical)
		{
			key = element.x;
		}
		else
		{
			key = element.y;
		}
		
		o[key] = element;
	}
	return o;
}

/**
数组按照元素的key排序
**/
function sortArray(ary)
{
	var keyList = [];
	var length = ary.length;
	for(var i = 0;i<length;i++)
	{
		for(var key in ary[i])
		{
			if(!isNaN(key))
			{
				fl.trace(key);
				//fl.trace(ary[i][key]);
				keyList.push(key);
			}
		}
	}
	keyList.sort(compare);
	fl.trace("**********keyList***************");
	fl.trace(keyList);
	var keyListLength = keyList.length
	var tempList = [];
	for(var i = 0; i<keyListLength; i++)
	{
		var key = keyList[i];
		fl.trace(["key i ",key]);
		for(var j = 0; j<length; j++)
		{
			for(var k in ary[j])
			{
				if(!isNaN(k))
				{
					//fl.trace(["key ", key,"k ",k]);
					if(key == k)
					{
						tempList.push(ary[j][k]);
						break;
					}
				}
			}
		}
	}
	fl.trace("*************************");
	fl.trace(tempList);
	return tempList
}

/**
比较
**/
function compare(a,b)
{
	return a-b;
}
/**
重命名方法
**/
function rename(name,flag,start)
{
	this.initElementList(flag);
	if(!arguments[2])start=1;
	var list = this.sortArray(this.elementList);
	var length = list.length;
	for(var i = 0;i<length;i++)
	{
		list[i].name = name +""+(i+start);
	}
}

var xpanel = dom.xmlPanel(fl.configURI + "Commands/批量修改实例名面板.xml");
//---dismiss---为xpanel面板内按下的事件类型---
if(xpanel.dismiss == "cancel") alert("您退出了。"+"\n"+"作者Kanon");
if(xpanel.dismiss == "accept")
{
	var name = xpanel["name"];
	fl.trace(name);
	fl.trace(xpanel["start"]);
	var start = Number(xpanel["start"]);
	fl.trace(start);
	if(isNaN(start))
	{	
		alert("参数错误");
	}
	else
	{
		var str = xpanel["sortby"];
		var bool = str == "纵坐标";
		this.rename(name,bool,start);
	}
}
