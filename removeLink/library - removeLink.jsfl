var dom = fl.getDocumentDOM();
var library = dom.library;
fl.trace(fl.configDirectory);
function run()
{
	var libList = library.getSelectedItems();
	var length = libList.length;
	for(var i = 0;i<length;i++)
	{
		//fl.trace(libList[i].itemType);
		if(libList[i].linkageClassName!="" && libList[i].itemType!="graphic")
		{
			libList[i].linkageClassName = "";
			libList[i].linkageExportForAS = false;
		}
	}
}
run()