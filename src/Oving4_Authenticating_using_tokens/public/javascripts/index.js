let myButton = document.querySelector("#myButton");
let test = document.querySelector('#test');
let url = "api/person/1";

myButton.addEventListener("click", e => {

    fetch('/token', {
        method: "GET",
        headers: {"x-access-token" : window.localStorage.token}
    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json)))
        .catch(error => console.error("Error: ", error));

    fetch(url, {
        method: "GET",
        headers: {"x-access-token" : window.localStorage.token}
    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json)))
        .catch(error => console.error("Error: ", error));

})



