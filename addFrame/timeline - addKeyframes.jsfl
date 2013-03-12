// Frame Extender 1.0
// Copyright 2006 Dave Wolfe
// dave@ironwagon.com

var doc = fl.getDocumentDOM();
var tl = doc.getTimeline();
var origFrame = tl.currentFrame;
var selFrames = tl.getSelectedFrames();

var numFrames = prompt("Number of Frames to Insert after each keyframe:  ");
numFrames = parseInt(numFrames);
if(isNaN(numFrames)){
	alert("Please type a whole number");
 }else{
	for (i = 0; i < selFrames.length; i += 3){
		doc.selectNone();
		tl.currentFrame = 0;
		var curLay = selFrames[i];
		var frmCount = tl.layers[curLay].frameCount;
		tl.currentLayer = curLay;
		while (tl.currentFrame < frmCount){
			var curFrame = tl.currentFrame;
			var insFrm = Number(numFrames);
			if (curFrame == tl.layers[curLay].frames[curFrame].startFrame){
				tl.insertFrames(insFrm, false);
			}else{
				break;
			}
			var span = tl.layers[curLay].frames[curFrame].duration;
			tl.currentFrame = curFrame + span;
			frmCount += span;
		}
	}
}