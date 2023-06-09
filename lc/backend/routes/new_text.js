const router = require('express').Router();

const textController = require('../controllers/textController');


router
    .route("/text")
    .post((req, res) => textController.create(req, res))


module.exports = router;