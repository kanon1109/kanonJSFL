var folderURL = fl.browseForFolderURL("选择需要导出图片的文件目录");
var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(folderURL);
function run(flag, width, height)
{
	var itemsList = library.getSelectedItems();
	var length = itemsList.length;
	for(var i=0;i<length;i++)
	{
		dom.addItem({x:0,y:0},itemsList[i]);
		dom.selectAll();
		dom.selection[0].width = width;
		dom.selection[0].height = height;
		dom.width = width;
		dom.height = height;
		var url = folderURL + "/" + itemsList[i].name + ".png";
		var moveX = -dom.selection[0].left;
		var moveY = -dom.selection[0].top;
		dom.moveSelectionBy({x:moveX,y:moveY});
		fl.trace("url" + url);
		if(flag)
		{
			dom.exportPNG(url,false,true);
		}
		else
		{
			dom.exportSWF(url,false,true);
		}
		dom.deleteSelection()
		dom.selectNone();
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/导出库元件设置大小.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var str = xmlpanel["sortby"];
	fl.trace(str)
	var bool = Boolean(str == "PNG");
	fl.trace(bool)
	var width = Number(xmlpanel["width"]);
	var height = Number(xmlpanel["height"]);
	this.run(bool,width,height);
}