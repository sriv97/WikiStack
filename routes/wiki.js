const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage")
const { Page } = require("../models");

router.get('/', (req,res,next) => {
  res.send("got to GET /wiki;");
});
router.post('/', (req,res,next) => {


  /*
  const page = new Page({
    title:
    content:
  }
  */

  res.send(req.body);
});
router.get('/add', (req,res,next) => {
  res.send(addPage());
});

module.exports = router;
