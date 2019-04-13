// eslint-disable-next-line no-unused-vars
var db = require("../models");
var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
    app.get("/", function(req, res) {
        res.render("signin");
    });

    app.get("/signup", authController.signup);

    app.get("/signin", authController.signin);

    app.post(
        "/signup",
        passport.authenticate("local-signup", {
            successRedirect: "/index",

            failureRedirect: "/signup"
        })
    );

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/signin");
    }

    app.get("/index", isLoggedIn, authController.dashboard);

    app.get("/logout", authController.logout);

    app.post(
        "/signin",
        passport.authenticate("local-signin", {
            successRedirect: "/index",

            failureRedirect: "/signin"
        })
    );

    // Load example page and pass in an example by id
    // app.get("/example/:id", function(req, res) {
    //     db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //         dbExample
    //     ) {
    //         res.render("example", {
    //             example: dbExample
    //         });
    //     });
    // });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
