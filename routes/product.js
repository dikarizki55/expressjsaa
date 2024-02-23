const express = require("express");
const router = express.Router();
const connect = require("../config/connect");

router
  .route("/")
  .get((req, res) => {
    const querySql = "SELECT * FROM bootcamp";

    connect.query(querySql, (err, rows, field) => {
      if (err) {
        return res.status(500).json({ message: "ada kesalahan", error: err });
      }

      // res.status(200).json({ success: true, data: rows });
      res.render("product/index", { data: rows });
    });
  })
  .post((req, res) => {
    console.log(req.body);
    const data = { ...req.body };
    const querySql = "INSERT INTO bootcamp SET ?";

    connect.query(querySql, data, (err, rows, field) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "gagal insert data", error: err });
      }

      // res.status(201).json({ success: true, message: "Berhasil input Data" });
      res.redirect("back");
    });
  });

router
  .route("/:id")
  .put((req, res) => {
    console.log(req.body);
    const data = { ...req.body };
    const querySearch = "SELECT * FROM bootcamp WHERE id = ?";
    const queryUpdate = "UPDATE bootcamp SET ? WHERE id = ?";

    connect.query(querySearch, req.params.id, (err, rows, field) => {
      if (err) {
        return res.status(500).json({ message: "ada kesalahan", error: err });
      }

      if (rows.length) {
        connect.query(
          queryUpdate,
          [data, req.params.id],
          (err, rows, field) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "ada kesalahan", error: err });
            }

            res
              .status(200)
              .json({ success: true, message: "berhasil update data" });
          }
        );
      } else {
        return res
          .status(404)
          .json({ message: "data tidak ditemukan", success: false });
      }
    });
  })
  .delete((req, res) => {
    const querySearch = "SELECT * FROM bootcamp WHERE id = ?";
    const queryDelete = "DELETE FROM bootcamp WHERE id = ?";

    connect.query(querySearch, req.params.id, (err, rows, field) => {
      if (err) {
        return res.status(500).json({ message: "ada kesalahan", error: err });
      }

      if (rows.length) {
        connect.query(queryDelete, req.params.id, (err, rows, field) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "ada kesalahan", error: err });
          }

          res
            .status(200)
            .json({ success: true, message: "data berhasil dihapus" });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Data tidak ditemukan" });
      }
    });
  });

module.exports = router;
