function run(item1, item2)
{
	//清楚trace内容
	fl.outputPanel.clear();
	
	var rect = dom.getSelectionRect();
	var left = rect.left;
	var top = rect.top;
	var right = rect.right;
	var bottom = rect.bottom;
	var w = right - left;
	var h = bottom - top;
	var gapH = w - item1.width - item2.width;
	var gapV = h - item1.height - item2.height;
	
	fl.trace(["gapH: "+gapH, " gapV: "+gapV]);
	fl.trace(["item1X: "+item1.x, " item1Y: "+item1.y]);
	fl.trace(["item2X: "+item2.x, " item2Y: "+item2.y]);

}

if(fl.getDocumentDOM().selection.length >= 2)
{
	run(fl.getDocumentDOM().selection[0], fl.getDocumentDOM().selection[1])
}
else
{
	alert("please selected two item");
}
