var dom = fl.getDocumentDOM();
var timeLine = dom.getTimeline();
/**
 *初始化元素数组
 **/
function initElementList()
{
	var elementList = [];
	var layers = timeLine.layers
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
			var currentFrame = frames[j];
			//---当前帧原素数组---
			var elements = currentFrame.elements;
			var elementLength = elements.length;
			fl.trace(["元素个数",elementLength]);
			for(var n = 0; n < elementLength; n++)
			{
				var element = elements[n]
				if(element.selected)
				{
					elementList.push(element);
					//fl.trace(element.name);
					//fl.trace(element.elementType);
				}
			}
		}
	}
	return elementList;
}

/**
 *判断列表
 **/
function checkList()
{
	var list = this.initElementList();
	var length = list.length;
	if(length==2)
		this.compare(list[0],list[1]);
	else
		alert("数量错误，必须选择2个否则不能互相交换位置。");
}

/**
 *交换2元件
 **/
function compare(a,b)
{
	var oldX = a.x;
	var oldY = a.y;
	
	a.x = b.x;
	a.y = b.y;
	
	b.x = oldX;
	b.y = oldY;
}

this.checkList();
