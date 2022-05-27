const express = require("express");
const items = require("../data");
const router = express.Router();

router.get("/", function (req, res, next) {
  return res.json({
    status: "success",

    data: items,
  });
});

module.exports = router;
