let router = require("express").Router();
let controllList = require("../controllers");

router.get("/", function (req, res) {
  res.json({
      status: 'API Its Working',
      message: 'Welcome to RESTHub crafted with love!',
  });
});


router.get("/user/balance/:email", controllList.get_user_balance);

router.get("/get/best/contributors/", controllList.getBestContributor);

module.exports = router;
