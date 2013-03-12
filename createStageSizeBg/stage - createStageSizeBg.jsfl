//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
/**
增加一个矩形
**/
function addRect(bSuppressFill,bSuppressStroke)
{
	var w = dom.width;
	var h = dom.height;
	dom.addNewRectangle({left:0,top:0,right:w,bottom:h},0, bSuppressFill,bSuppressStroke);
}
var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/添加舞台相同高宽的框面板.xml");
if(xmlpanel.dismiss == "accept")
{
	var str = xmlpanel["sortby"];
	if(str == "只有线条")
	{
		this.addRect(true,false);
	}
	else if(str == "只有填充")
	{
		this.addRect(false,true);
	}
	else if(str == "有线条和填充")
	{
		this.addRect(false,false);
	}
}