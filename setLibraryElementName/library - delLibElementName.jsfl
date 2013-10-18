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
        fl.trace("newName: " + itemList[i].name);
	}
}

function charAt(str, start, len, bool)
{
    if(!arguments[1]) start = 0;
	if(!arguments[2]) len = 1;
    var length = str.length;
    if(len > length) len = length;
    if(start > length) start = length;
    fl.trace("length: " + length)
    fl.trace("len: " + len);
    fl.trace("start: " + start);
    var newStr = "";
    var s = start;
    var e = start + len;
    if(bool)
    {
        fl.trace("s:" + s);
        fl.trace("e:" + e);
        
        newStr += str.substring(0, s + 1);
        fl.trace("1newStr:" + newStr);
        newStr += str.substring(e, len);
        fl.trace("2newStr:" + newStr);
        
        //头部开始删除
        /*for(var i = 0; i < length; i+=1)
        {
            if(i < s || i >= e) 
            {
                newStr += str.charAt(i);
            }
        }*/
    }
    else
    {
        //3 - 1 - 0 - 2 = 0
        //2
        s = length - 1 - start - len;
        e = s + len;
        fl.trace("s:" + s);
        fl.trace("e:" + e);
        newStr += str.substring(0, s);
        fl.trace("1newStr:" + newStr);
        newStr += str.substring(e + 1, len);
        fl.trace("2newStr:" + newStr);
        /*for(var i = 0; i < length; i+=1)
        {
            if(i <= s || i > e) 
            {
                newStr += str.charAt(i);
            }
        }*/
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
    fl.trace("order: " + str);
    fl.trace("len: " + len);
	var bool = str == "从头部开始删除";
	this.run(start, len, bool);
}