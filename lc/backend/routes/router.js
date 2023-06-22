const router = require('express').Router();


const textRouter = require('./new_text');
// const baseRouter = require('./base');

router.use("/", textRouter);

module.exports = router;