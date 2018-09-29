let button = document.querySelector("#button");
let text = document.querySelector("#textInput");
let url = "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment?api-key=Happy!!!";

console.log('test');

button.addEventListener("click", event => {
    console.log("Fikk click event");
    let textInput = text.value;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ sentence: textInput})
    })
        .then(response => response.json())
        .then(json => getNumber(json))
        .catch(error => console.error("Error :", error));

});

function getNumber(json){
    let div = document.querySelector("#wrapper");
    let number = json.value;
    if (number < 2 ){
        div.className = "white";
    } else if (number == 2){
        div.className = "red";
    } else if (number == 3){
        div.className = "blue";
    } else if (number == 4){
        div.className = "green";
    }


}