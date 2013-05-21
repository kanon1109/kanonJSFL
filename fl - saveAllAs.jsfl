var length = fl.documents.length;
for(var i = 0; i< length; i+=1)
{
	fl.saveDocumentAs(fl.documents[i]);
}
