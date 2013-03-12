var doc = fl.getDocumentDOM();
var tl = fl.getDocumentDOM().getTimeline();
var selFrames = tl.getSelectedFrames();
var frameLength = selFrames[2] - selFrames [1];

tl.currentFrame = selFrames[2]-1;
fl.trace(tl.currentFrame);
for (i=0; i<frameLength; i++)
{
	for (n=0; n<selFrames.length; n+=3)
	{
		layerNum = selFrames[n];
		curFrame = tl.currentFrame;
		tl.setSelectedLayers(layerNum, false);
		if(tl.currentFrame == tl.layers[layerNum].frames[curFrame].startFrame)
		{
			tl.setSelectedFrames(selFrames);
			tl.currentFrame = curFrame;
			tl.insertKeyframe();
			doc.selectAll();
			doc.clipCut();
			tl.setSelectedLayers(selFrames[0], true);
			doc.clipPaste(true);
			n = selFrames.length
		}
	}
	tl.currentFrame --;
}
