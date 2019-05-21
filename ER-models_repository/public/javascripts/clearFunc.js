function clearFunc() {
    var myNode = document.getElementById('canvas');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}