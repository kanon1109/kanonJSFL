//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
//---层---
var layers = timeLine.layers
/**
初始化元素数组
**/
function initElementList()
{
	var layers = timeLine.layers
	var layerLength = timeLine.layers.length;
	var elementList = [];
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
			var currentFrame = frames[j];
			//---当前帧原素数组---
			var elements = currentFrame.elements;
			var elementLength = elements.length;
			fl.trace(["元素个数",elementLength]);
			for(var n = 0; n < elementLength; n++)
			{
				var element = elements[n];
				if(element.selected)
				{
					//fl.trace(element.name);
					
					var o = this.filterElement(element);
					elementList.push(o);
				}
			}
		}
	}
	fl.trace(elementList.length);
	return elementList;
}

/**
过滤匹配类型的元素
**/
function filterElement(element)
{
	if(element.selected)
	{
		var o = {};
		var key = element.depth;
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
	fl.trace(["ary",length]);
	for(var i = 0;i<length;i++)
	{
		for(var key in ary[i])
		{
			//fl.trace(key);
			//fl.trace(ary[i][key]);
			keyList.push(key);
		}
	}
	//---排序key列表---
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
*布局
**/
function layoutElement(row,column,gapX,gapY,startX,startY)
{
	if(!arguments[2])gapX=0;
	if(!arguments[3])gapY=0;
	if(!arguments[4])startX=0;
	if(!arguments[5])startY=0;
	var elementList = this.sortArray(this.initElementList());
	var length = elementList.length;
	fl.trace([length,row*column])
	if(length>row*column)
	{
		alert("行数和列数的乘积必须大于所选元件的数量！");
		return;
	}
	
	var r = 0; 
	var c = 0;
	for(var i = 0;i<length;i++)
	{
		var width = elementList[i].width;
		var height = elementList[i].height; 
		elementList[i].x = (gapX+width)*c + startX;
		elementList[i].y = (gapY+height)*r + startY;
		if(row>column)
		{
			r++;
			if(r>=row)
			{
				c++;
				r = 0;
			}
		}
		else
		{
			c++;
			if(c>=column)
			{
				r++;
				c = 0;
			}
		}
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/自动排列布局面板.xml");
//---dismiss---为xmlpanel面板内按下的事件类型---
//if(xmlpanel.dismiss == "cancel") alert("您退出了。"+"\n"+"作者Kanon");
if(xmlpanel.dismiss == "accept")
{
	var row = xmlpanel["row"];
	var column = xmlpanel["column"];
	var gapX = xmlpanel["gapX"];
	var gapY = xmlpanel["gapY"];
	var startX = xmlpanel["startX"];
	var startY = xmlpanel["startY"];
	
	row = Number(row);
	column = Number(column);
	gapX = Number(gapX);
	gapY = Number(gapY);
	startX = Number(startX);
	startY = Number(startY);
	
	if(isNaN(row)||isNaN(column)||isNaN(gapX)||isNaN(gapY)||isNaN(startX)||isNaN(startY))
	{
		alert("参数错误");
	}
	else
	{
		this.layoutElement(row,column,gapX,gapY,startX,startY);
	}
}
