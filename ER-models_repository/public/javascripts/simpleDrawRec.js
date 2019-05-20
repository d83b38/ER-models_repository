//const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var SVG_URI = 'http://www.w3.org/2000/svg';
var canvas = document.getElementById('canvas');

function getPoint(evt) {
    return {
        x: evt.offsetX,
        y: evt.offsetY
    }   
}

canvas.addEventListener('click', (evt) => {
    const cir1 = document.createElementNS(SVG_URI, "rect");
    //alert(` ${getPoint(evt).x} ${getPoint(evt).y}`);
    cir1.setAttribute("x", getPoint(evt).x);
    cir1.setAttribute("y", getPoint(evt).y);    
    cir1.setAttribute("height", 5);
    cir1.setAttribute("width", 5);
    cir1.setAttribute("fill", "red");

    canvas.appendChild(cir1);
});

