let router = require("express").Router();
let controllList = require("../controllers");

router.get("/", function (req, res) {
  res.json({
      status: 'API Its Working',
      message: 'Welcome to RESTHub crafted with love!',
  });
});

router.post("/save/post", controllList.savePost);

router.post("/increase/value", controllList.increaseValue);

router.get("/get/best/contributors/", controllList.getBestContributor);

module.exports = router;
