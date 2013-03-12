var dom = fl.getDocumentDOM();
var library = dom.library;
var bExpand = false;
function run()
{
	var libList = library.items;
	var length = libList.length;
	
	for(var i = 0;i<length;i++)
	{
		bExpand = !bExpand;
		if(libList[i].itemType == 'folder')
		{
			fl.trace(libList[i].name)
			library.expandFolder(true,true,libList[i].name);
			
		}
	}
}

this.run();