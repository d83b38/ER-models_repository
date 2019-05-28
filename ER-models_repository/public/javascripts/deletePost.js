function deletePostAjax(postID,authorID) {
    var data = {
        authorID: ''
    };
    data.authorID = authorID;
    dataString = JSON.stringify(data);
    var xhr = new window.XMLHttpRequest();
    var url = `/catalog/post/${postID}/delete`;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(dataString);
    console.log('requestToDeleteSended');
    window.location.replace("http://localhost:3000/catalog/posts");
}

