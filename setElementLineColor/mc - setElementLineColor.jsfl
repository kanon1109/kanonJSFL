var dom = fl.getDocumentDOM();
var timeline = dom.getTimeline();
function setElementStrokeColor(list, color, thickness)
{
	//fl.trace(["in",list.length])
	var length = list.length;
	for(var i=0; i<length; i++)
	{
		var element = list[i];
		if(element.elementType == "shape")
		{
			element.selected = true;
			dom.selectAll();
			var myStroke = dom.getCustomStroke("selection"); 
			myStroke.color = color;
			dom.setCustomStroke(myStroke);
			dom.setStrokeSize(thickness);
			dom.exitEditMode();
			element.selected = false;
		}
		else if(element.elementType == "instance")
		{
			dom.selectNone();
			element.selected = true;
			dom.enterEditMode("inPlace");
			dom.selectAll();
			setElementStrokeColor(dom.selection, color, thickness);
			dom.selectNone();
		}
	}
	dom.selectNone();
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/修改线条颜色.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var thickness = xmlpanel["thickness"];
	thickness = Number(thickness);
	var color = xmlpanel["color"];
	this.setElementStrokeColor(dom.selection,color,thickness);
}
