function saveCreate(relationships) {
    var data = JSON.stringify(relationships);
    var xhr = new window.XMLHttpRequest();
    xhr.open('POST', '/catalog/post/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(data);
    console.log('requestsended');
}

function saveEdit(relationships,id) {
    var data = JSON.stringify(relationships);
    console.log(id);
    var xhr = new window.XMLHttpRequest();
    var url = `/catalog/post/${id}/edit`;
    console.log(url);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(data);
    console.log('requestsended');
}