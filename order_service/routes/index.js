let router = require("express").Router();
let controllList = require("../controllers");

router.get("/", function (req, res) {
  res.json({
      status: 'API Its Working',
      message: 'Welcome to RESTHub crafted with love!',
  });
});


router.get("/get/all/orders", controllList.getAllOrders);

module.exports = router;
