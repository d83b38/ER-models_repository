function reDraw(postID) {
    var data = postID;
    var xhr = new window.XMLHttpRequest();
    var temp_url = `/catalog/post/${postID}/update`;
    xhr.open('POST', temp_url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
    console.log('requestToReDrawSended');
}