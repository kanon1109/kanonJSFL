var dom = fl.getDocumentDOM();
if(dom.getTimeline().layers[0].frames[0].elements.length != 1)
{
	alert("only one mc on stage");
}
else if(dom.getTimeline().layers[0].frames[0].elements[0].elementType != "instance")
{
	alert("elementType muset be only movie clip");
}
else
{
	run(dom.getTimeline().layers[0].frames[0].elements[0]);
}
function run(item1)
{
	dom.selectAll();
	dom.enterEditMode("inPlace");
	var length = dom.getTimeline().layers.length;
	var left = Infinity;
	var top = Infinity;
	var right = -Infinity;
	var bottom = -Infinity;
	for(var i = 0; i < length; i++)
	{
		for(var m = 0; m < dom.getTimeline().layers[i].frames.length; m++)
		{
			var len = dom.getTimeline().layers[i].frames[m].elements.length;
			for(var j = 0; j < len; j++)
			{
				var element = dom.getTimeline().layers[i].frames[m].elements[j];
				if(element.left < left)
				{
					left = element.left;
				}
				if(element.top < top)
				{
					top = element.top;
				}
				if(element.left + element.width > right)
				{
					right = element.left + element.width;
				}
				if(element.top + element.height > bottom)
				{
					bottom = element.top + element.height;
				}
			}
		}
	}
	dom.exitEditMode();
	dom.selectNone();
	fl.trace([left, top, right, bottom]);
	//var stageWidth = right - left;
	//var stageHeight = bottom - top;
	dom.getTimeline().layers[0].frames[0].elements[0].x = -left;
	dom.getTimeline().layers[0].frames[0].elements[0].y = -top;
	//取整
	dom.width = (right - left)^0;
	dom.height = (bottom - top)^0;
	//fl.trace([stageWidth, stageHeight]);
	
}