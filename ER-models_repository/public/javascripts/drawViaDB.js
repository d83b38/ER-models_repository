window.relationships = [];
import { getPoint, createRectangle} from './drawModule.js';
//window.drawLocal = function () { }

export function drawViaDB(model) {
    var canvas = document.getElementById('canvas');
    var SVG_URI = 'http://www.w3.org/2000/svg';
    relationships = model;
    const width = 100;
    const height = 50;
    const recColor = 'red';

    for (var i = 0; i < relationships.length; ++i) {
        //console.log(relationships[i].entity_1);
        var e_name1 = relationships[i].entity_1.name;
        var e_name2 = relationships[i].entity_2.name;
        var coord1 = relationships[i].entity_1.coordinates;
        var coord2 = relationships[i].entity_2.coordinates;
        var first1 = false;
        var second1 = false;
        var first2 = false;
        var second2 = false;
        var foundedEntityFromDB1;
        var foundedEntityFromDB2;
        var foundedRelationship1 = relationships.find(function checkEntity(checkedRelationship) {
            if (checkedRelationship.entity_1.name === e_name1) {
                first1 = true;
                return checkedRelationship;
            }
            if (checkedRelationship.entity_2.name === e_name1) {
                second1 = true;
                return checkedRelationship;
            }
        });

        if (first1) {
            foundedEntityFromDB1 = foundedRelationship1.entity_1;
        }
        if (second1) {
            foundedEntityFromDB1 = foundedRelationship1.entity_2;
        }

        var foundedRelationship2 = relationships.find(function checkEntity(checkedRelationship) {
            if (checkedRelationship.entity_1.name === e_name2) {
                first2 = true;
                return checkedRelationship;
            }
            if (checkedRelationship.entity_2.name === e_name2) {
                second2 = true;
                return checkedRelationship;
            }
        });

        if (first2) {
            foundedEntityFromDB2 = foundedRelationship2.entity_1;
        }
        if (second2) {
            foundedEntityFromDB2 = foundedRelationship2.entity_2;
        }

        if (!(typeof foundedEntityFromForm1 === 'undefined')) {
            //console.log('foundedEntityFromForm1');
            //alert(`уже есть ${foundedEntityFromForm1.name} `);
            var rec1 = foundedEntityFromForm1;
            if (!(typeof foundedEntityFromForm2 === 'undefined')) {
                //alert(`тоже есть ${foundedEntityFromForm2.name} надо соединить их `);
                //alert('случай 1.1');
                var rec2 = foundedEntityFromForm2;
                const drawPath = document.createElementNS(SVG_URI, 'path');
                drawPath.setAttribute('stroke', '#ff0000');
                drawPath.setAttribute('fill', 'none');
                drawPath.setAttribute('d', `M${parseFloat(rec2.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec2.coordinates[1]) + (height / 2)} 
                                    L${parseFloat(rec1.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec1.coordinates[1]) + (height / 2)} `);
                canvas.appendChild(drawPath);

                continue;
            }
            if (typeof foundedEntityFromForm2 === 'undefined') {
                //alert(` ${e_name2} еще не встречалась надо построить `);
                //alert('случай 1.2');
                //построение  2 
                const rec2 = createRectangle(coord2[0], coord2[1], height, width, recColor);
                ////отрисовка пути от существующей первой к новой
                const drawPath = document.createElementNS(SVG_URI, 'path');
                drawPath.setAttribute('stroke', '#ff0000');
                drawPath.setAttribute('fill', 'none');
                drawPath.setAttribute('d', `M${parseFloat(rec1.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec1.coordinates[1]) + (height / 2)} 
                                    L${parseFloat(rec2.getAttribute('x')) + parseFloat(rec2.getAttribute('width')) / 2} 
                                     ${parseFloat(rec2.getAttribute('y')) + parseFloat(rec2.getAttribute('height')) / 2} `);
                canvas.appendChild(drawPath);
                //подписываем имена
                const textelement2 = document.createElementNS(SVG_URI, 'text');
                textelement2.setAttribute('x', parseFloat(rec2.getAttribute('x')) + parseFloat(rec2.getAttribute('width')) / 2);
                textelement2.setAttribute('y', parseFloat(rec2.getAttribute('y')) + parseFloat(rec2.getAttribute('height')) / 2);
                textelement2.setAttribute('fill', '#000');
                textelement2.setAttribute('style', 'text-anchor: middle');
                textelement2.textContent = `${e_name2}`;
                //рисуем саму сущность + ее имя
                const group2 = document.createElementNS(SVG_URI, 'g');
                group2.appendChild(rec2);
                group2.appendChild(textelement2);
                canvas.appendChild(group2);

                continue;
            }
        }
        else {
            //alert(` ${e_name1} еще не встречалась, надо построить `);
            //построение 1
            const rec1 = createRectangle(coord1[0], coord1[1], height, width, recColor);
            if (!(typeof foundedEntityFromForm2 === 'undefined')) {
                //alert(`уже есть ${foundedEntityFromForm2.name} надо соединить их `);
                //alert('случай 2.1');
                //построение соединения
                //добавление общее 
                const rec2 = foundedEntityFromForm2;
                const drawPath = document.createElementNS(SVG_URI, 'path');
                drawPath.setAttribute('stroke', '#ff0000');
                drawPath.setAttribute('fill', 'none');
                drawPath.setAttribute('d', `M${parseFloat(rec2.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec2.coordinates[1]) + (height / 2)} 
                                    L${parseFloat(rec1.getAttribute('x')) + parseFloat(rec1.getAttribute('width')) / 2} 
                                     ${parseFloat(rec1.getAttribute('y')) + parseFloat(rec1.getAttribute('height')) / 2} `);
                canvas.appendChild(drawPath);
                //подписываем имена
                const textelement1 = document.createElementNS(SVG_URI, 'text');
                textelement1.setAttribute('x', parseFloat(rec1.getAttribute('x')) + parseFloat(rec1.getAttribute('width')) / 2);
                textelement1.setAttribute('y', parseFloat(rec1.getAttribute('y')) + parseFloat(rec1.getAttribute('height')) / 2);
                textelement1.setAttribute('fill', '#000');
                textelement1.setAttribute('style', 'text-anchor: middle');
                textelement1.textContent = `${e_name1}`;
                //добавляем саму сущность + ее имя
                const group1 = document.createElementNS(SVG_URI, 'g');
                group1.appendChild(rec1);
                group1.appendChild(textelement1);
                canvas.appendChild(group1);
                //сохраняем связь
                
                continue;
            }
            if (typeof foundedEntityFromForm2 === 'undefined') {
                //alert(` ${e_name2} еще не встречалась надо построить `);
                //alert('случай 2.2');
                //построение 2
                const rec2 = createRectangle(coord2[0], coord2[1], height, width, recColor);
                const drawPath = document.createElementNS(SVG_URI, 'path');
                drawPath.setAttribute('stroke', '#ff0000');
                drawPath.setAttribute('fill', 'none');
                drawPath.setAttribute('d', `M${parseFloat(rec1.getAttribute('x')) + parseFloat(rec1.getAttribute('width')) / 2}, 
                                 ${parseFloat(rec1.getAttribute('y')) + parseFloat(rec1.getAttribute('height')) / 2} 
                                L${parseFloat(rec2.getAttribute('x')) + parseFloat(rec2.getAttribute('width')) / 2}, 
                                 ${parseFloat(rec2.getAttribute('y')) + parseFloat(rec2.getAttribute('height')) / 2} `);
                canvas.appendChild(drawPath);

                const textelement1 = document.createElementNS(SVG_URI, 'text');
                textelement1.setAttribute('x', parseFloat(rec1.getAttribute('x')) + parseFloat(rec1.getAttribute('width')) / 2);
                textelement1.setAttribute('y', parseFloat(rec1.getAttribute('y')) + parseFloat(rec1.getAttribute('height')) / 2);
                textelement1.setAttribute('fill', '#000');
                textelement1.setAttribute('style', 'text-anchor: middle');
                textelement1.textContent = `${e_name1}`;

                const group1 = document.createElementNS(SVG_URI, 'g');
                group1.appendChild(rec1);
                group1.appendChild(textelement1);
                canvas.appendChild(group1);

                const textelement2 = document.createElementNS(SVG_URI, 'text');
                textelement2.setAttribute('x', parseFloat(rec2.getAttribute('x')) + parseFloat(rec2.getAttribute('width')) / 2);
                textelement2.setAttribute('y', parseFloat(rec2.getAttribute('y')) + parseFloat(rec2.getAttribute('height')) / 2);
                textelement2.setAttribute('fill', '#000');
                textelement2.setAttribute('style', 'text-anchor: middle');
                textelement2.textContent = `${e_name2}`;

                const group2 = document.createElementNS(SVG_URI, 'g');
                group2.appendChild(rec2);
                group2.appendChild(textelement2);
                canvas.appendChild(group2);

                continue;
            }
        }
    }
}