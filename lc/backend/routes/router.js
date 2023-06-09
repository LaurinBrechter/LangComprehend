const router = require('express').Router();


const textRouter = require('./new_text');
router.use("/", textRouter);

module.exports = router;