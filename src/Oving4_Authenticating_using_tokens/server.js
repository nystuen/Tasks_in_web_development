var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var app = express();
app.use(bodyParser.json()); // for å tolke JSON i body

// urlencodedParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// Burde vært ekte sertifikat, lest fra config...
let privateKey = (publicKey = "shhhhhverysecret");

function loginOk(username, password) {
    return password == "secret";
}

// Server klientapplikasjonen (i public-mappa) på rot-url'en http://localhost:8080
app.use(express.static('public'));

// Set view engine til ejs
app.set('view engine', 'ejs');

// Håndterer login og sender JWT-token tilbake som JSON
app.post("/login", urlencodedParser, (req, res) => {
    console.log("brtukernavn: " + req.body.brukernavn + "\npassword: " + req.body.passord);
    if (loginOk(req.body.brukernavn, req.body.passord)) {
        // if (true) {
        console.log("Brukernavn & passord ok");
        let token = jwt.sign({brukernavn: req.body.brukernavn}, privateKey, {
            expiresIn: 60
        });
        res.json(token);
        // res.render('index', {token: token});
    } else {
        console.log("Brukernavn & passord IKKE ok");
        res.status(401);
        res.json({error: "Not authorized"});
    }
});

app.get("/token", (req, res) => {
    let token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, (err, decoded) => {
        if(err) {
            console.log("Token IKKE ok - gir ikke ut nytt token.");
            res.status(401);
            res.json({error: "Not authorized"});
        } else {
            console.log("Token ok, gitt nytt token.");

            let token = jwt.sign({brukernavn: decoded.brukernavn}, privateKey, {
                expiresIn: 20
            });
            res.json(token);
        }
    })
});


// Plasserer denne MÌDDLEWARE-funksjonen
// foran alle endepunktene under samme path
app.use("/api", (req, res, next) => {
    var token = req.headers["x-access-token"];
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({error: "Not authorized"});
        } else {
            console.log("Token ok: " + decoded.brukernavn);
            next();
        }
    });
});


app.get('/login', function (req, res) {
    res.render('login', {});
});

app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/test', function (req, res) {
    res.render('test', {});
});


app.get("/api/person", (req, res) => {
    console.log("Skal returnere en liste med personer");
    res.json([{name: "Hei Sveisen"}]);
});
''
app.get("/api/person/:personId", (req, res) => {
    console.log("Skal returnere personen med id " + req.params.personId);
    res.json({name: "Hei Sveisen"});
});

app.post("/api/person", (req, res) => {
    console.log("Skal legge til en ny person i DB");
    res.send("");
});

var server = app.listen(8080);

