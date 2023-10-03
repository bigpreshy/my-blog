const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("", async (req, res) => {
  try {
    const metaInfo = {
      title: "Precious' Blog",
      description:
        "This is just my personal blog where I write stuff technical",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    // const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
    //   .skip(perPage * page - perPage)
    //   .limit(perPage)
    //   .exec();

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: perPage * (page - 1),
      take: perPage,
    });

    const count = await prisma.post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // const posts = await prisma.post.findMany({
    //   take: 4,
    // });
    res.render("index", {
      metaInfo,
      posts,
      currentRoute: "/",
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});