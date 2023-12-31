// const { post } = require('../models')
const { Op } = require('sequelize');
const {Post} = require("../models");

const homePage = async (req, res) => {
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

    // const posts = await prisma.post.findMany({
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    //   skip: perPage * (page - 1),
    //   take: perPage,
    // });

const posts = await Post.findAll({
  order: [['createdAt', 'DESC']], // Order by createdAt in descending order
  offset: perPage * (page - 1), // Calculate the number of records to skip
  limit: perPage, // Limit the number of records per page
});
     const count = await Post.count()
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
};

const singlePost = async (req, res) => {
  try {
    let slug = req.params.slug;

    // const post = await prisma.post.find;

    const post = await Post.findOne({
      where: {
        slug: slug,
      },
    });
    

    const metaInfo = {
      title: post.title,
      description: "Simple Blog created with NodeJs, Express & Prisma.",
    };

    res.render("article", {
      metaInfo,
      post,
      currentRoute: `/article/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, res) => {
  try {
    const metaInfo = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & Prisma.",
    };

    let searchTerm = req.body.searchTerm;

    // console.log(searchTerm);
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.substring]: searchNoSpecialChar,
            },
          },
          {
            body: {
              [Op.substring]: searchNoSpecialChar,
            },
          },
        ],
      },
    });

    // console.log(posts.length);

    res.render("searchHome", {
      posts,
      metaInfo,
      searchTerm,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    homePage,
    singlePost,
    search
}
