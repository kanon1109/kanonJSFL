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
					fl.trace(element.elementType);
					if(this.filterElement(element))
					{
						elementList.push(element);
						element.selected = false;
					}
					
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
	if(element.selected && element.elementType == "instance")
	{
		return true
	}
	return false
}

function setPostionPoint(direction)
{
	var ary = this.initElementList();
	var length = ary.length;
	for(var i=0; i<length; i++)
	{
		//---先选择单个---
		ary[i].selected = true;
		//---进入编辑模式---只能选择一个进行编辑
		dom.enterEditMode("inPlace");
		//---全选---
		dom.selectAll();
		var rect = dom.getSelectionRect();
		var left = rect.left;
		var top = rect.top;
		var right = rect.right;
		var bottom = rect.bottom;
		var w = right - left;
		var h = bottom - top;
		var vx = 0;
		var vy = 0;
		fl.trace([left,right,top,bottom]);
		switch(direction)
		{
			case "left":
				vx = -left;
				break;
			case "right":
				vx = -right;
				break;
			case "top":
				vy = -top;
				break;
			case "bottom":
				vy = -bottom;
				break;
			case "leftTop":
				vx = -left;
				vy = -top;
				break;
			case "leftBottom":
				vx = -left
				vy = -bottom;
				break;
			case "rightTop":
				vx = -right
				vy = -top;
				break;
			case "rightBottom":
				vx = -right
				vy = -bottom;
				break;
			case "center":
				vx = -right+ w/2;
				vy = -bottom+h/2;
				break;
			default:
			break;
		}
		dom.moveSelectionBy({x: vx, y: vy});
		dom.exitEditMode();
		ary[i].selected = false;
		ary[i].x += -vx;
		ary[i].y += -vy;
		ary[i].setTransformationPoint({x: -vx, y: -vy});
	}
}

/**
*选择方向
**/
function selectDirection(dir)
{
	var ary = ["左上角对齐","左对齐","左下角对齐","右上角对齐","右对齐","右下角对齐","上对齐","下对齐","居中"];
	var dirList = ["leftTop","left","leftBottom","rightTop","right","rightBottom","top","bottom","center"];
	var length = ary.length;
	var index;
	for(var i=0;i<length;i++)
	{
		if(ary[i]==dir)
		{
			index = i;
			break;
		}
	}
	if(i==length) return false;
	return dirList[index];
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/批量修改注册点.xml");
//---dismiss---为xmlpanel面板内按下的事件类型---
//if(xmlpanel.dismiss == "cancel") alert("您退出了。"+"\n"+"作者Kanon");
if(xmlpanel.dismiss == "accept")
{
	var str = xmlpanel["sortby"];
	var dir = selectDirection(str)
	this.setPostionPoint(dir);
}
