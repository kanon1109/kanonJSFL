var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(fl.configDirectory);
function run(name,start,isSameName)
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
		if(!isSameName)
			itemList[i].linkageClassName = name + (start + i);
		else
			itemList[i].linkageClassName = itemList[i].name;
		itemList[i].linkageBaseClass = "";
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/library - setLinkName.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var name = xmlpanel["name"];
	var start =  Number(xmlpanel["start"]);
	var isSameName = xmlpanel["type"] == "与元件名相同";
	if(isNaN(start))
	{
		alert("参数错误");
	}
	else
	{
		this.run(name,start,isSameName);
	}
}