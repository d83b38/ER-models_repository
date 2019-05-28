function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function saveCreate(transRelationships, id) {
    var token = getCookie("authToken");
    var data = {
        name: '',
        relationships: {},
        userID: ''
    };
    var postName = document.forms.postNameForm.elements.postName.value; 
    var url = `/catalog/post/create/${token}`;
    if (!(typeof transRelationships === 'undefined')) {
        data.name = postName;
        data.relationships = transRelationships;
        data.userID = id;
        dataString = JSON.stringify(data);
        var xhr = new window.XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(dataString);
        console.log('requestsended');
    }
    else {
        alert('Model cannot be empty!');
        return;
    }
}

function sendComment(postID, currUserLocal) {
    if (currUserLocal) {
        var token = getCookie("authToken");
        var url = `/catalog/post/${postID}/addComment/${token}`;
        var button = document.getElementById('buttonComment');
        var xhr = new window.XMLHttpRequest();
        var data = {
            userID: '',
            commentText: ''
        };

        data.userID = currUserLocal.id;
        data.commentText = document.getElementById('commentInput').value;

        dataString = JSON.stringify(data);

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.send(dataString);

        addCommentToDoc(currUserLocal.login, data.commentText);
    }
    else {
        alert('Необходимо авторизоваться!');
    }

}
function addCommentToDoc(userLogin, commentText) {
    var containerCom = $("<div>");
    containerCom.addClass("uk-card uk-card-default uk-grid-top-small uk-padding-small");
    var h = $("<h4>");
    h.text(`${userLogin}:`);
    h.addClass("user uk-margin-small uk-padding-remove ");
    containerCom.append(h);
    var span = $("<span>");
    span.text(`${commentText}`);
    span.width(350);
    span.addClass("text uk-margin-small uk-padding-remove");
    containerCom.append(span);
    $("div#commentBlock").append(containerCom);
}

function saveEdit(relationships, id) {
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