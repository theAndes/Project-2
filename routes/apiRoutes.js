var db = require("../models");
var bcrypt = require('bcrypt');

module.exports = function(app) {
    
    app.post('/register', function(req, res) {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(function (user) {
            if (!user) {
                res.redirect('/');
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, reault) {
                    if (result === true) {
                        res.redirect('/');
                    } else {
                        res.send('Inccorect Password');
                    }
                });
            }
        });
    });
    // Get all examples
    // app.get("/api/examples", function(req, res) {
    //     db.Example.findAll({}).then(function(dbExamples) {
    //         res.json(dbExamples);
    //     });
    // });

    // // Create a new example
    // app.post("/api/examples", function(req, res) {
    //     db.Example.create(req.body).then(function(dbExample) {
    //         res.json(dbExample);
    //     });
    // });

    // // Delete an example by id
    // app.delete("/api/examples/:id", function(req, res) {
    //     db.Example.destroy({ where: { id: req.params.id } }).then(function(
    //         dbExample
    //     ) {
    //         res.json(dbExample);
    //     });
    // });
};
