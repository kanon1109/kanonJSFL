var dom = fl.getDocumentDOM();
if(dom.getTimeline().layers[0].frames[0].elements.length != 1)
{
	alert("only one mc on stage");
}
else if(dom.getTimeline().layers[0].frames[0].elements[0].elementType != "instance")
{
	alert("elementType muset be only movie clip");
}
else
{
	run(dom.getTimeline().layers[0].frames[0].elements[0]);
}
function run(item1)
{
	dom.selectAll();
	dom.enterEditMode("inPlace");
	
	var length = dom.getTimeline().layers.length;
	for(var i = 0; i < length; i++)
	{
		alert(dom.getTimeline().layers[i].frames[0].elements[0].y);
	}
	
}