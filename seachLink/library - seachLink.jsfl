var dom = fl.getDocumentDOM();
var library = dom.library;
function seachLibraryLink(linkageClassName)
{
	var length = library.items.length;
	var items = library.items;
	for(var i=0; i<length; i++)
	{
		if(items.itemType == "folder")
		{
			fl.trace(["打开的文件夹",items.name]);
			library.expandFolder(true, true, items.name);
		}
		if(items[i].linkageClassName == linkageClassName)
		{
			var name = items[i].name;
			library.selectItem(name);
			break;
		}
	}
	if(i==length)alert("未找到该元件");
}

var xmlPanel = dom.xmlPanel(fl.configURI + "Commands/library - seachLink.xml");
if(xmlPanel.dismiss == "accept")
{
	var classLink = xmlPanel["classLink"];
	this.seachLibraryLink(classLink);
}

