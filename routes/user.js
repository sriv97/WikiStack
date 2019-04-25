const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const AllUserPage = require("../views/userList");
const userPage = require("../views/userPages");


router.get('/', async (req,res,next) => {
  const allAuthors = await User.findAll();
  res.send(AllUserPage(allAuthors));
});
router.post('/', (req,res,next) => {
  res.send("got to post /user;");
});
router.get('/:id', async (req,res,next) => {
  const pageOwner = await User.findOne({
    where:{id:req.params.id}
  });
  const ownerPosts = await Page.findAll({
    where:{authorId:req.params.id}
  })
  res.send(userPage(pageOwner,ownerPosts));
});

module.exports = router;
