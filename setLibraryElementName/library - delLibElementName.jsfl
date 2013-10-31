var dom = fl.getDocumentDOM();
var library = dom.library;
fl.outputPanel.clear();
fl.trace(fl.configDirectory);

function run(start, len, bool)
{
	var libList = library.getSelectedItems();
	var length = libList.length;
	var itemList = [];
	for(var i = 0; i < length; i++)
	{
		itemList.push(libList[i]);
	}
	length = itemList.length;
	for(var i = 0; i < length; i++)
	{
        var str = itemList[i].name;
        itemList[i].name = this.charAt(str, start, len, bool);
        //fl.trace("newName: " + itemList[i].name);
	}
	fl.trace("finish");
}

function charAt(str, start, len, bool)
{
    if(!arguments[1]) start = 0;
	if(!arguments[2]) len = 1;
    var length = str.length;
    if(len > length) len = length;
    if(start > length) start = length;
    var newStr = "";
    var s = start;
    var e = start + len;
    if(bool)
    {
		//头部开始删除
        newStr = str.substring(0, s) + str.substr(e, length);
    }
    else
    {
        s = length - 1 - start - len;
        e = s + len;
        newStr = str.substring(0, s + 1) + str.substr(e + 1 , length);
    }
    if(newStr == "") fl.trace("名字不能为空")
    return newStr
}


var xmlpanel = dom.xmlPanel(fl.configURI + "Commands/library - delLibElementName.xml")
//---dismiss---为xpanel面板内按下的事件类型---
if(xmlpanel.dismiss == "accept")
{
	var start =  Number(xmlpanel["start"]);
	var len =  Number(xmlpanel["len"]);
	if(isNaN(start)) alert("参数错误");
	if(isNaN(len)) alert("参数错误");
    var str = xmlpanel["order"];
    //fl.trace("order: " + str);
    //fl.trace("len: " + len);
	var bool = str == "从头部开始删除";
	this.run(start, len, bool);
}