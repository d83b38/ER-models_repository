var SVG_URI = 'http://www.w3.org/2000/svg';
var canvas = document.getElementById('canvas');
import { getPoint, createRectangle } from './drawModule.js';

var rec1Created = false;
var logicFlag  = false;
var coord1 = [0, 0];
var coord2 = [0, 0];

canvas.addEventListener('click', (evt) => {
    try {
        if (!rec1Created && logicFlag) {
            var temp1 = document.getElementById('temp1');
            var temp2 = document.getElementById('temp2');
            canvas.removeChild(temp1);
            canvas.removeChild(temp2);

        }

    } catch (e) {
        ;
    }


    const height = 5;
    const width = 5;
    if (!rec1Created) {
        var rec1 = createRectangle(getPoint(evt, 'canvas').x,
                                 getPoint(evt, 'canvas').y, 
            height, width, 'green');
        rec1.setAttribute('id', 'temp1');
        coord1 = [getPoint(evt, 'canvas').x, getPoint(evt, 'canvas').y];
        var coord1string = `${coord1[0]},${coord1[1]}`;
        canvas.appendChild(rec1);
        document.getElementById('entity1Coord').value = coord1string;
        rec1Created = true;
        checkAndActivate();
        return;
    }

    if ( rec1Created ) {
        var rec2 = createRectangle(getPoint(evt, 'canvas').x, getPoint(evt, 'canvas').y, height, width, 'green');
        rec2.setAttribute('id', 'temp2');
        coord2 = [getPoint(evt, 'canvas').x, getPoint(evt, 'canvas').y];
        canvas.appendChild(rec2);
        var coord2string = `${coord2[0]},${coord2[1]}`;
        document.getElementById('entity2Coord').value = coord2string;
        rec1Created = false;
        logicFlag = true;
        checkAndActivate();
    }
});
