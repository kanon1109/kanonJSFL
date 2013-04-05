var folderURL = fl.browseForFolderURL("选择需要导出图片的文件目录");
var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(fl.configDirectory);
function run(flag)
{
	var itemsList = library.getSelectedItems();
	var length = itemsList.length;
	fl.trace(length)
	for(var i=0;i<length;i++)
	{
		dom.addItem({x:0,y:0},itemsList[i]);
		dom.selectAll();
		var width = dom.selection[0].width;
		var height = dom.selection[0].height;
		dom.width = Math.floor(width);
		dom.height =  Math.floor(height);
		var url = folderURL + "/" + itemsList[i].name + ".png";
		fl.trace("url" + url);
		var moveX = -dom.selection[0].left;
		var moveY = -dom.selection[0].top;
		dom.moveSelectionBy({x:moveX,y:moveY});
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

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/library - importElement.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var str = xmlpanel["sortby"];
	fl.trace(str)
	var bool = Boolean(str == "PNG");
	fl.trace(bool)
	this.run(bool);
}