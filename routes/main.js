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

//Ading post
// const addPost = async (req, res) => {
//   const postAdded = await prisma.post.createMany({
//     data: [
//       {
//         slug: "unique-slug-1",
//         title: "Object 1",
//         body: "This is the body of object 1.",
//       },
//       {
//         slug: "unique-slug-2",
//         title: "Object 2",
//         body: "This is the body of object 2.",
//       },
//       {
//         slug: "unique-slug-3",
//         title: "Object 3",
//         body: "This is the body of object 3.",
//       },
//       {
//         slug: "unique-slug-4",
//         title: "Object 4",
//         body: "This is the body of object 4.",
//       },
//       {
//         slug: "unique-slug-5",
//         title: "Object 5",
//         body: "This is the body of object 5.",
//       },
//       {
//         slug: "unique-slug-6",
//         title: "Object 6",
//         body: "This is the body of object 6.",
//       },
//       {
//         slug: "unique-slug-7",
//         title: "Object 7",
//         body: "This is the body of object 7.",
//       },
//       {
//         slug: "unique-slug-8",
//         title: "Object 8",
//         body: "This is the body of object 8.",
//       },
//       {
//         slug: "unique-slug-9",
//         title: "Object 9",
//         body: "This is the body of object 9.",
//       },
//       {
//         slug: "unique-slug-10",
//         title: "Object 10",
//         body: "This is the body of object 10.",
//       },
//       {
//         slug: "unique-slug-11",
//         title: "Object 11",
//         body: "This is the body of object 11.",
//       },
//       {
//         slug: "unique-slug-12",
//         title: "Object 12",
//         body: "This is the body of object 12.",
//       },
//       {
//         slug: "unique-slug-13",
//         title: "Object 13",
//         body: "This is the body of object 13.",
//       },
//       {
//         slug: "unique-slug-14",
//         title: "Object 14",
//         body: "This is the body of object 14.",
//       },
//       {
//         slug: "unique-slug-15",
//         title: "Object 15",
//         body: "This is the body of object 15.",
//       },
//       {
//         slug: "unique-slug-16",
//         title: "Object 16",
//         body: "This is the body of object 16.",
//       },
//       {
//         slug: "unique-slug-17",
//         title: "Object 17",
//         body: "This is the body of object 17.",
//       },
//       {
//         slug: "unique-slug-18",
//         title: "Object 18",
//         body: "This is the body of object 18.",
//       },
//       {
//         slug: "unique-slug-19",
//         title: "Object 19",
//         body: "This is the body of object 19.",
//       },
//       {
//         slug: "unique-slug-20",
//         title: "Object 20",
//         body: "This is the body of object 20.",
//       },
//     ],
//   });
// };
// addPost();

// try {
//   addPost();

// } catch (error) {
//   console.log(error);

// }

//Each post

router.get("/article/:slug", async (req, res) => {
  try {
    let slug = req.params.slug;

    // const post = await prisma.post.find;

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });

    const metaInfo = {
      title: post.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("article", {
      metaInfo,
      post,
      currentRoute: `/article/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

// search

router.post("/search", async (req, res) => {
  try {
    const metaInfo = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;

    console.log(searchTerm);
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchNoSpecialChar,
              // mode: "insensitive", //Not needed
            },
          },
          {
            body: {
              contains: searchNoSpecialChar,
              // mode: "insensitive",  // Not needed
            },
          },
        ],
      },
    });

    res.render("searchHome", {
      posts,
      metaInfo,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  router,
};
