const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page, User } = require("../models");
const wikipage = require("../views/wikipage");
const homepage = require("../views/main");


router.get('/', async (req,res,next) => {
  const allPages = await Page.findAll();
  res.send(homepage(allPages));
});

router.post('/', async (req,res,next) => {
  const [author,wasCreated] = await User.findOrCreate(
    {where:{name:req.body.authorName,email:req.body.authorEmail}
});


  try{
  await author.save();
}catch(error) {next(error)}

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    authorId: author.id
    });

    try {
  await page.save();
  res.redirect(`/wiki/${page.slug}`);
  // res.send(page);
} catch (error) { next(error) }

});
router.get('/add', (req,res,next) => {
  res.send(addPage());
});

router.get('/:slug', async(req,res,next) => {
  const pagerequested = await Page.findOne({
    where: {
      slug:req.params.slug
    }
  })
  const authorOfPage = await pagerequested.getAuthor();
  res.send(wikipage(pagerequested,authorOfPage));
});

module.exports = router;
