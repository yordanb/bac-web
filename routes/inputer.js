var express = require("express");

var router = express.Router();

var database = require("../database");

router.get("/", function (request, response, next) {
  response.render("inputer", { title: "Input Score BLi 2023 BAC" });
});

router.post("/action", function (request, response, next) {
  var action = request.body.action;

  if (action == "fetch") {
    var query = "SELECT * FROM sample_data ORDER BY id DESC";

    database.query(query, function (error, data) {
      response.json({
        data: data,
      });
    });
  }

  if (action == "Add") {
    var nama_panggilan = request.body.nama_panggilan;
    var asal_perusahaan = request.body.asal_perusahaan;
    var tot_arrow = request.body.tot_arrow;
    var tot_poin = request.body.tot_poin;
    var date_take_score = request.body.date_take_score;
    var time_take_score = request.body.time_take_score;

    var query = `
		INSERT INTO sample_data 
		(nama_panggilan, asal_perusahaan, tot_arrow, tot_poin, date_take_score, time_take_score) 
		VALUES ("${nama_panggilan}", "${asal_perusahaan}", "${tot_arrow}", "${tot_poin}", "${date_take_score}", "${time_take_score}")
		`;

    database.query(query, function (error, data) {
      response.json({
        message: "Data Added",
      });
    });
  }

  if (action == "fetch_single") {
    var id = request.body.id;

    var query = `SELECT * FROM sample_data WHERE id = "${id}"`;

    database.query(query, function (error, data) {
      response.json(data[0]);
    });
  }

  if (action == "Edit") {
    var id = request.body.id;
    var nama_panggilan = request.body.nama_panggilan;
    var asal_perusahaan = request.body.asal_perusahaan;
    var tot_arrow = request.body.tot_arrow;
    var tot_poin = request.body.tot_poin;
    var date_take_score = request.body.date_take_score;
    var time_take_score = request.body.time_take_score;

    var query = `
		UPDATE sample_data 
		SET nama_panggilan = "${nama_panggilan}", 
		asal_perusahaan = "${asal_perusahaan}", 
    tot_arrow = "${tot_arrow}", 
		tot_poin = "${tot_poin}",
    date_take_score = "${date_take_score}", 
		time_take_score = "${time_take_score}"
		WHERE id = "${id}"
		`;

    database.query(query, function (error, data) {
      response.json({
        message: "Data Edited",
      });
    });
  }

  if (action == "delete") {
    var id = request.body.id;

    var query = `DELETE FROM sample_data WHERE id = "${id}"`;

    database.query(query, function (error, data) {
      response.json({
        message: "Data Deleted",
      });
    });
  }
});

module.exports = router;
