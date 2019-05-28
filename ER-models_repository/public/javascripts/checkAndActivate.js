function checkAndActivate() {
    var invalidForms = [];
    invalidForms = document.querySelectorAll(':invalid');
    if (!(invalidForms.length === 0)) {
        disable();
    }
    else {
        enable();
    }
}
function disable() {
    document.getElementById('buttonAdd').disabled = true;
}
function enable() {
    document.getElementById('buttonAdd').disabled = false;
}