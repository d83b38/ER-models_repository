
function deleteToken() {
    var name = "authToken";
    document.cookie = name + "=" + "; expires=N/A; path=/";
    window.location.replace("http://localhost:3000/");
}