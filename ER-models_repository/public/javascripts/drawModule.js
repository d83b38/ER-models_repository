var SVG_URI = 'http://www.w3.org/2000/svg';
//Create svg rectangle in (x,y) - top left corner
export function createRectangle(x, y, height, width, fillColor) {
    var rec = document.createElementNS(SVG_URI, 'rect');
    rec.setAttribute('x', x );
    rec.setAttribute('y', y );
    rec.setAttribute('height', height);
    rec.setAttribute('width', width);
    rec.setAttribute('fill', fillColor);
    return rec;
}

//Get coordinates of svg canvas (transforms page coordinates into svg coordinates)
export function getPoint(e, svgCanvasName) {
    var canvas = document.getElementById(svgCanvasName);
    function svgPoint(x, y) {
        var pt = canvas.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(canvas.getScreenCTM().inverse());
    }
    var x = e.clientX;
    var y = e.clientY;
    var svgP = svgPoint(x, y, svgCanvasName);

    return {
        x: Math.round(svgP.x),
        y: Math.round(svgP.y)
    };
}


