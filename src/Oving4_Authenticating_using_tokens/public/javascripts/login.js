let username = document.getElementById("username");
let password = document.getElementById("password");
let button = document.querySelector('#loginButton');


button.addEventListener("click", e => {

    console.log("Token: " + window.localStorage.getItem('token'));

    console.log("Username: " + username.value + "\nPassord: " + password.value);
    fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            brukernavn: username.value,
            passord: password.value
        })
    })
        .then(response => response.json())
        .then(json => window.localStorage.setItem('token', json))
        .catch(error => console.error("Error: ", error));
});
