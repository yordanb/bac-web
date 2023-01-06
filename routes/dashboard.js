var express = require("express");

var router = express.Router();

var database = require("../database");

router.get("/", function (request, response, next) {
  response.render("dashboard", { title: "Score Board BLi 2023 BAC" });
});

router.post("/action", function (request, response, next) {
  var action = request.body.action;

  if (action == "fetch") {
    var query =
      "SELECT @rank := @rank + 1 as peringkat, t.`id_archer`, t.`nama_panggilan`, t.`asal_perusahaan`, t.tot_poin, t.tot_arrow FROM (SELECT `id_archer`,`nama_panggilan`,`asal_perusahaan`, SUM(`tot_poin`) as tot_poin, SUM(`tot_arrow`) as tot_arrow FROM `sample_data` GROUP BY `id_archer` ORDER BY tot_poin DESC) t, (SELECT @rank := 0) r;";

    database.query(query, function (error, data) {
      response.json({
        data: data,
      });
    });
  }
});

module.exports = router;
