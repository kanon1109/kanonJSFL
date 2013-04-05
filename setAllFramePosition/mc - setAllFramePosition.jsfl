var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
//---层---
var layers = timeLine.layers;
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
		return true;
	}
	return false;
}

/**
设置元素位置
**/
function setElementPostion(elementList,x,y)
{
    var length = elementList.length;
    var pos = {};
    for(var i = 0; i<length; i++)
    {
        var element = elementList[i];
        pos.x = element.x;
        pos.y = element.y;
        element.selected = true;
        dom.enterEditMode("inPlace");
        var timelines = dom.getTimeline();
        var layers = timelines.layers
	    var layerLength = timelines.layers.length;
        for(var j = 0; j<layerLength; j++)
        {
            var currentLayer = layers[j];
		    //---当前层帧数组---
		    var frames = currentLayer.frames;
		    var frameLength = frames.length;
            for(var n = 0; n < frameLength; n++)
            {
				timelines.setSelectedFrames(n,n);
                var frame = currentLayer.frames[n];
                var elements = frame.elements;
                var elementLength = elements.length;
                 fl.trace(["elementLength",elementLength])
                for(var m=0; m<elementLength; m++)
                {
                    var e = elements[m];
                    fl.trace(["selection",dom.selection.length])
                    var rect = dom.getSelectionRect();
                    fl.trace([rect.left,rect.top,rect.right,rect.bottom]);
                    fl.trace([e.x,e.y]);
					fl.trace([rect.left,rect.top]);
                    fl.trace("--------------------")
                    //---参数x,y全局转mc内局部坐标---
                    var vx = x - rect.left;
					var vy = y - rect.top;
                    dom.moveSelectionBy({x: vx, y: vy});
                    fl.trace([e.x,e.y]);
                    fl.trace("----------end----------")
                }
            }
        }
        dom.exitEditMode();
        element.selected = false;
    }
}

var xpanel = dom.xmlPanel(fl.configURI + "Commands/mc - setAllFramePosition.xml");
//---dismiss---为xpanel面板内按下的事件类型---
if(xpanel.dismiss == "accept")
{
	var x =  Number(xpanel["x"]);
	fl.trace(x);
	var y = Number(xpanel["y"]);
	fl.trace(y);
	if(isNaN(x)||isNaN(y))
	{	
		alert("参数错误");
	}
	else
	{
		this.setElementPostion(this.initElementList(),x,y);
	}
}


