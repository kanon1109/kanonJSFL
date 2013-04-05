var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(fl.configDirectory);
function run(name,start)
{
	var libList = library.getSelectedItems();
	var length = libList.length;
	var itemList = [];
	if(!arguments[1])start=1;
	for(var i = 0;i<length;i++)
	{
		fl.trace(libList[i].itemType)
		if(libList[i].itemType!="graphic")
		{
			itemList.push(libList[i]);
		}
	}
	length = itemList.length;
	for(var i = 0;i<length;i++)
	{
		itemList[i].linkageExportForAS = true;
		itemList[i].linkageExportInFirstFrame = true;
		itemList[i].linkageClassName = name + (start + i);
		itemList[i].linkageBaseClass = "";
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/library - setLinkName.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var name = xmlpanel["name"];
	var start =  Number(xmlpanel["start"]);
	if(isNaN(start))
	{
		alert("参数错误");
	}
	else
	{
		this.run(name,start);
	}
}