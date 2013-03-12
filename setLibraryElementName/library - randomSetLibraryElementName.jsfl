var dom = fl.getDocumentDOM();
var library = dom.library;
//fl.trace(fl.configDirectory);
fl.getDocumentDOM().library.selectAll();
function run(start,isRandom)
{
	var libList = library.getSelectedItems();
	var length = libList.length;
	var itemList = [];
	if(!arguments[0])start=1;
	if(!arguments[1])isRandom=false;
	for(var i = 0;i<length;i++)
	{
		//fl.trace(libList[i].itemType)
		itemList.push(libList[i]);
	}
	length = itemList.length;
	
	for(var i = 0;i<length;i++)
	{
		var name = this.setName(arr);
		var str = "";
		if(isRandom == 0)
		{
			//fl.trace((Math.floor(Math.random()*9000)+1000));
			str = name + (start + i);
		}
		else
		{
			str = name + (Math.floor(Math.random()*9000)+1000);
		}
		itemList[i].name = str;
	}
}
function sample(sequence, num)
{
	var len = sequence.length;
	if (num <= 0 || len < num)
		return
	var selected = [];
	var indices = [];
	for (var i = 0; i < num; i++)
	{
		var index = Math.floor(Math.random() * len);
		while (indices.indexOf(index) >= 0)
			index = Math.floor(Math.random() * len);
		
		selected.push(sequence[index]);
		indices.push(index);
	}
	//fl.trace(selected)
	return selected;
}

var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
function setName(ary)
{	
	var r = Math.floor(Math.random()*10+5);
	//fl.trace(r)
	var nameList = [] ;
	nameList = this.sample(ary,r);
	//fl.trace(nameList)
	var name = "";
	var len = nameList.length;
	for(var i = 0; i<len; i++)
	{
		name+=nameList[i];
	}
	return name;
}

this.run(1,true);
/*var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/批量修改库元件名面板.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var name = xmlpanel["name"];
	var start =  Number(xmlpanel["start"]);
	if(isNaN(start)) alert("参数错误");
	var str = xmlpanel["sortby"];
	var bool = str == "随机索引";
	fl.trace(bool)
	this.run(name,start,bool);
}*/