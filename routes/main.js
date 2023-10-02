const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  const metaInfo = {
    title: "Precious' Blog",
    description: "This is just my personal blog where I write stuff technical",
  };
  res.render("index", { metaInfo, currentRoute: "/" });
});

module.exports = {
  router,
};
