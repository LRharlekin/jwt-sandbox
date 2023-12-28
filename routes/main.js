const express = require("express");
const router = expres.Router();

const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
