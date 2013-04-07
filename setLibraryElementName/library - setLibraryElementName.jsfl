var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(fl.configDirectory);

function run(name,start,isRandom)
{
	var libList = library.getSelectedItems();
	var length = libList.length;
	var itemList = [];
	if(!arguments[1])start=1;
	if(!arguments[2])isRandom=false;
	for(var i = 0;i<length;i++)
	{
		//fl.trace(libList[i].itemType)
		itemList.push(libList[i]);
	}
	length = itemList.length;
	for(var i = 0;i<length;i++)
	{
		var str = "";
		if(!isRandom)
		{
			str = name + (start + i);
		}
		else
		{
			str = name + (Math.floor(Math.random()*9000)+1000);
		}
		fl.trace(str)
		itemList[i].name = str;
	}
}

var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/library - setLibraryElementName.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var name = xmlpanel["name"];
	var start =  Number(xmlpanel["start"]);
	if(isNaN(start)) alert("参数错误");
	var str = xmlpanel["sortby"];
	var bool = str == "随机索引";
	fl.trace(bool);
	this.run(name,start,bool);
}