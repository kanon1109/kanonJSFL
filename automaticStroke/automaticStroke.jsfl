autoStroke( fl.getDocumentDOM().selection[0] );

function autoStroke( shape )
{
    if( shape == null || shape.elementType != 'shape')
        return;

    var path = fl.drawingLayer.newPath();
    var e,p0,p1,p2;
    var ed = shape.edges; // << this is the key of optimization
    for (var i = 0; i < ed.length; i++)
    {
        path.newContour(); //lift the pen to avoid lines across the shape
        //for all edges
        e = ed[i];
        //get controll points
        p0 = e.getControl(0);
        p1 = e.getControl(1);
        p2 = e.getControl(2);

        if (e.isLine)
        {
            //straight line
            path.addPoint(p0.x,p0.y);
            path.addPoint(p2.x,p2.y);
        }
        else
        {
            //curve with one midle point
            path.addCurve(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
        }
     
    }

    path.makeShape(true); //draw the contour without fill
}