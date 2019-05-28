import { drawViaDB } from '/javascripts/drawViaDB.js'
var btnDelEnt = document.getElementById('btnDelEnt');
btnDelEnt.addEventListener('click', (evt) => {
    function clearFunc() {
        var myNode = document.getElementById('canvas');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    var form1 = document.forms.delForm;
    var e_nameToDe = form1.elements.entityToDel.value;
    window.relationships = window.relationships.filter(function (relationship) {
        return relationship.entity_1.name !== e_nameToDe;
    });
    window.relationships = window.relationships.filter(function (relationship) {
        return relationship.entity_2.name !== e_nameToDe;
    });
    clearFunc();
    drawViaDB(window.relationships);
});
