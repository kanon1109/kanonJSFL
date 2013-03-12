//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
//---层---
var layers = timeLine.layers
var elementList = [];
/**
初始化元素数组
**/
function initElementList()
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
				var o = filterElement(element);
				this.elementList.push(o);
			}
		}
	}
	fl.trace(["个数",this.elementList.length])
}


/**
过滤匹配类型的元素
**/
function filterElement(element)
{
	if(element.selected)
	{
		var o = {};
		var key;
		key = element.depth;
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
	return b-a;
}

var newElement = null;
function createElement()
{
	this.initElementList();
	var list = this.sortArray(this.elementList);
	var length = list.length;
	var elementTimeLine;
	list[0].selected = false;
	dom.clipCut();
	for(var i = 0; i < length; i++)
	{
		if(!newElement)
		{
			//---将第一个元件转成一个新元件---
			list[0].selected = true;
			newElement = dom.convertToSymbol("movie clip", "", "top left");
			list[0].selected = false;
			newElement.selected = true;
			dom.enterEditMode('inPlace');
			elementTimeLine = dom.getTimeline();
			newElement.selected = false;
		}
		else
		{
			elementTimeLine.insertBlankKeyframe(i);
			dom.clipPaste();
			//---粘贴结束后 会自动选中这些被粘贴的元件----
			if(i == length-1) return;
			//---得到选中的元件----
			var selectList = dom.selection;
			var elist = [];
			//---重新根据深度排序---
			for(var j = 0;j < selectList.length; j++)
			{
				var o = this.filterElement(selectList[j]);
				elist.push(o);
			}
			elist = this.sortArray(elist);
			elist[0].selected = false;
			dom.clipCut();
		}
	}
}


createElement();