//const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var SVG_URI = 'http://www.w3.org/2000/svg';
var canvas = document.getElementById('canvas');

function getPoint(evt) {
    return {
        x: evt.offsetX,
        y: evt.offsetY
    }
}
var form = document.forms.currForm;
var elem = form.elements.entity1Name;

var tempArray = [];
var rec1Created = false;
var coord1 = [0, 0];
var coord2 = [0, 0];
canvas.addEventListener('click', (evt) => {

    if (!rec1Created) {
        const rec1 = document.createElementNS(SVG_URI, 'rect');
        //alert(` ${getPoint(evt).x} ${getPoint(evt).y}`);
        rec1.setAttribute('x', getPoint(evt).x-10);
        rec1.setAttribute('y', getPoint(evt).y-10);
        rec1.setAttribute('height', 20);
        rec1.setAttribute('width', 20);
        coord1 = [getPoint(evt).x , getPoint(evt).y];
        rec1.setAttribute('fill', 'red');
        canvas.appendChild(rec1);
        rec1Created = true;
        return;
    }

    if ( rec1Created ) {
        const rec2 = document.createElementNS(SVG_URI, 'rect');
        rec2.setAttribute('x', getPoint(evt).x-10);
        rec2.setAttribute('y', getPoint(evt).y-10);
        rec2.setAttribute('height', 20);
        rec2.setAttribute('width', 20);
        coord2 = [getPoint(evt).x, getPoint(evt).y];
        rec2.setAttribute('fill', 'red');
        canvas.appendChild(rec2);

        const drawPath = document.createElementNS(SVG_URI, 'path');
        drawPath.setAttribute('stroke', '#ff0000');
        drawPath.setAttribute('fill', 'none');
        drawPath.setAttribute('d', `M${coord1[0]} ${coord1[1]} L${coord2[0]} ${coord2[1]} `);
        canvas.appendChild(drawPath);
        rec1Created = false;
    }
});
