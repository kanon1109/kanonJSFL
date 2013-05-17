var dom = fl.getDocumentDOM();
var library = dom.library;
function run()
{
	var length = library.items.length;
	var item;
	for(var i=length-1; i>=0; i--)
	{
		item = library.items[i];
		if(item.itemType == "bitmap")
		{
			item.linkageExportForAS = true;
			item.linkageExportInFirstFrame = true;
			item.linkageClassName = item.name;
			item.allowSmoothing = false;
			item.compressionType = "photo";
			item.originalCompressionType = "photo";
			item.useImportedJPEGQuality = true;
		}
	}
}

run();