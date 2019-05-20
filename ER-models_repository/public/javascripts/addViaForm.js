function editModel(model) {
    if (!(typeof model === 'null')) {
        relationships = model;
    }
}

var buttonAdd = document.getElementById('buttonAdd');
var canvas = document.getElementById('canvas');
var SVG_URI = 'http://www.w3.org/2000/svg';
var relationships = [];
const width = 100;
const height = 50;
function myXOR(a, b) {
    return (a || b) && !(a && b);
}

function getCoord(rowString) {
    var arrayCoord = [];
    return (arrayCoord = rowString.split(','))
}

buttonAdd.addEventListener('click', (evt) => {
    var form = document.forms.currForm; 
    var e_name1 = form.elements.entity1Name.value;
    var e_name2 = form.elements.entity2Name.value;
    var coord1 = getCoord(form.elements.entity1Coord.value);
    var coord2 = getCoord(form.elements.entity2Coord.value);
    var r_name = form.elements.relationshipName.value;

    function checkEntity(relationship, currName) {
        if (relationship.entity_1.name === currName) {
            return relationship.entity_1
        }
        if (relationship.entity_2.name === currName) {
            return relationship.entity_2
        }
    }
    //найден объект на первом месте с именем первой сущности из текущей формы
    var first1 = false;
    var second1 = false;
    var first2 = false;
    var second2 = false;

    var foundedRelationship1 = relationships.find(function checkEntity(relationship) {
        if (relationship.entity_1.name === e_name1) {
            first1 = true;
            return relationship;
        }
        if (relationship.entity_2.name === e_name1) {
            second1 = true;
            return relationship
        }
    });

    if (first1) {
        var foundedEntityFromForm1 = foundedRelationship1.entity_1;
    }
    if (second1) {
        var foundedEntityFromForm1 = foundedRelationship1.entity_2;
    }
   
    var foundedRelationship2 = relationships.find(function checkEntity(relationship) {
        if (relationship.entity_1.name === e_name2) {
            first2 = true;;
            return relationship
        }
        if (relationship.entity_2.name === e_name2) {
            second2 = true;;
            return relationship
        }
    });

    if (first2) {
        var foundedEntityFromForm2 = foundedRelationship2.entity_1;
    }
    if (second2) {
        var foundedEntityFromForm2 = foundedRelationship2.entity_2;
    }

    if (!(typeof foundedEntityFromForm1 === 'undefined')) {
        console.log('foundedEntityFromForm1');
        alert(`уже есть ${foundedEntityFromForm1.name} `);
        var rec1 = foundedEntityFromForm1;
        if (!(typeof foundedEntityFromForm2 === 'undefined')) {
            alert(`тоже есть ${foundedEntityFromForm2.name} надо соединить их `);
            alert('случай 1.1');
            var rec2 = foundedEntityFromForm2;
            const drawPath = document.createElementNS(SVG_URI, 'path');
            drawPath.setAttribute('stroke', '#ff0000');
            drawPath.setAttribute('fill', 'none');
            drawPath.setAttribute('d', `M${parseFloat(rec2.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec2.coordinates[1]) + (height / 2)} 
                                    L${parseFloat(rec1.coordinates[0]) + (width / 2)} 
                                     ${parseFloat(rec1.coordinates[1]) + (height / 2)} `);
            canvas.appendChild(drawPath);

            var relationship = {
                entity_1: {
                    name: rec1.name,
                    attributes: [],
                    coordinates: rec1.coordinates
                },
                entity_2: {
                    name: rec2.name,
                    attributes: [],
                    coordinates: rec2.coordinates
                }
            }
            relationships.push(relationship);
            return 
        }
        if (typeof foundedEntityFromForm2 === 'undefined') {
            alert(` ${e_name2} еще не встречалась надо построить `);
            alert('случай 1.2');
            //построение  2 
            const rec2 = document.createElementNS(SVG_URI, 'rect');
            rec2.setAttribute('x', coord2[0]);
            rec2.setAttribute('y', coord2[1]);
            rec2.setAttribute('height', 50);
            rec2.setAttribute('width', 100);
            rec2.setAttribute('fill', 'red');
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
            //сохраняем связь
            var relationship = {
                entity_1: {
                    name: rec1.name,
                    attributes: [],
                    coordinates: rec1.coordinates
                },
                entity_2: {
                    name: e_name2,
                    attributes: [],
                    coordinates: coord2
                }
            }
            relationships.push(relationship);
            return 
        }
    }
    else {
        alert(` ${e_name1} еще не встречалась, надо построить `);
        //построение 1
        const rec1 = document.createElementNS(SVG_URI, 'rect');
        rec1.setAttribute('x', coord1[0]);
        rec1.setAttribute('y', coord1[1]);
        rec1.setAttribute('height', 50);
        rec1.setAttribute('width', 100);
        rec1.setAttribute('fill', 'red');
        if (!(typeof foundedEntityFromForm2 === 'undefined')) {
            alert(`уже есть ${foundedEntityFromForm2.name} надо соединить их `);
            alert('случай 2.1');
            //построение соединения
            //добавление общее 
            var rec2 = foundedEntityFromForm2;
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
            var relationship = {
                entity_1: {
                    name: e_name1,
                    attributes: [],
                    coordinates: coord1
                },
                entity_2: {
                    name: rec2.name,
                    attributes: [],
                    coordinates: rec2.coordinates
                }
            }
            relationships.push(relationship);
            return 
        }
        if (typeof foundedEntityFromForm2 === 'undefined') {
            alert(` ${e_name2} еще не встречалась надо построить `);
            alert('случай 2.2');
            //построение 2
            const rec2 = document.createElementNS(SVG_URI, 'rect');
            rec2.setAttribute('x', coord2[0]);
            rec2.setAttribute('y', coord2[1]);
            rec2.setAttribute('height', 50);
            rec2.setAttribute('width', 100);
            rec2.setAttribute('fill', 'red');

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
            var relationship = {
                entity_1: {
                    name: e_name1,
                    attributes: [],
                    coordinates: coord1
                },
                entity_2: {
                    name: e_name2,
                    attributes: [],
                    coordinates: coord2
                }
            }
            relationships.push(relationship);
            return 
        }
    }
}
)