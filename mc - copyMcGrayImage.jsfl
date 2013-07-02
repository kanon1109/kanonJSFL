function run()
{
	fl.getDocumentDOM().clipCopy();
	fl.getDocumentDOM().clipPaste();
	
	var selection = fl.getDocumentDOM().selection;
	var length = selection.length;
	var element;
	fl.getDocumentDOM().selectNone();
	for(var i = 0; i < length; i+=1)
	{
		element = selection[i];
		element.selected = true;
		fl.trace(element.elementType)
		fl.getDocumentDOM().convertToSymbol("movie clip", "$_temp_mc" + Math.floor(Math.random()*9000)+1000 ,"top left");
		fl.getDocumentDOM().addFilter("adjustColorFilter");
		var myFilters = fl.getDocumentDOM().getFilters();
		for(j=0; j < myFilters.length; j++)
		{
			if(myFilters[j].name == 'adjustColorFilter')
				myFilters[j].saturation = 0-100;
		}
		fl.getDocumentDOM().setFilters(myFilters);
		fl.getDocumentDOM().selectNone();
	}
}

if(fl.getDocumentDOM().selection.length > 0)
{
	run()
}
else
{
	alert("please selected one item");
}
