const Dao = require("./dao.js");

module.exports = class PersonDao extends Dao {
    getAll(callback) {
        super.query("select id, navn, alder, adresse from person", [], callback);
    }

    getOne(id, callback) {
        super.query(
            "select navn, alder, adresse from person where id=?",
            [id],
            callback
        );
    }

    createOne(json, callback) {
        var val = [json.navn, json.adresse, json.alder];
        super.query(
            "insert into person (navn,adresse,alder) values (?,?,?)",
            val,
            callback
        );
    }

    updateAge(json, callback) {
        let val = [json.alder, json.id];
        super.query(
            "UPDATE person SET alder=? WHERE id=?",
            val,
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "DELETE FROM person WHERE id=?",
            [id],
            callback
        );
    }

};
