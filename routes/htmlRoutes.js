var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("db.example: ", db.Example);
    res.render("login");
  });
  //
  app.get("/index", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

=======
    res.render("index");
  });
>>>>>>> fdd8b196613ab99ff138bbba2304e09013568e6c
=======
    res.render("index");
  });
>>>>>>> fdd8b196613ab99ff138bbba2304e09013568e6c
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
