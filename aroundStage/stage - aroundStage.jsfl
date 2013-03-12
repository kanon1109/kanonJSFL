//---Document ： Document是指的用户打开的一个FLA文件，一个FLA文件就是一个Document---
var dom = fl.getDocumentDOM();
//---当前时间轴---
var timeLine = dom.getTimeline();
/**
增加一个矩形
**/
function rectRound()
{
	var w = dom.width;
	var h = dom.height;
	var thickness = 400;
	//---上左下右---
	dom.addNewRectangle({left:-thickness,top:-thickness,right:w+thickness,bottom:0},0, false,true);
	dom.addNewRectangle({left:-thickness,top:-thickness,right:0,bottom:h+thickness},0, false,true);
	dom.addNewRectangle({left:-thickness,top:h,right:w+thickness,bottom:h+thickness},0, false,true);
	dom.addNewRectangle({left:w,top:-thickness,right:w+thickness,bottom:h+thickness},0, false,true);	
}
rectRound();
