const express = require("express");
const items = require("../data");
const router = express.Router();

router.get("/", function (req, res, next) {
  return res.json({
    status: "success",

    data: items,
  });
});

router.post("/", function (req, res, next) {
  const item = req.body;
  return res.json({
    status: "success",
    data: item,
  });
});

module.exports = router;
