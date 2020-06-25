let router = require("express").Router();
let controllList = require("../controllers");

router.get("/", function (req, res) {
  res.json({
      status: 'API Its Working',
      message: 'Welcome to RESTHub crafted with love!',
  });
});

router.post("/order/item/", controllList.orderItem);

router.get("/get/all/orders", controllList.getAllOrder);

router.post("/increase/user/balance", controllList.increaseBalance);

router.get("/get/user/balance/:email", controllList.getUserBalance);

module.exports = router;
