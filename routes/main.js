const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("", async (req, res) => {
  const metaInfo = {
    title: "Precious' Blog",
    description: "This is just my personal blog where I write stuff technical",
  };

  try {
    const posts = await prisma.post.findMany();
    res.render("index", { metaInfo, posts, currentRoute: "/" });
  } catch (error) {
    console.log(error);
  }
});

const addPost = async (req, res) => {
  const postAdded = await prisma.post.createMany({
    data: [
      {
        slug: "unique-slug-1",
        title: "Object 1",
        body: "This is the body of object 1.",
      },
      {
        slug: "unique-slug-2",
        title: "Object 2",
        body: "This is the body of object 2.",
      },
      {
        slug: "unique-slug-3",
        title: "Object 3",
        body: "This is the body of object 3.",
      },
      {
        slug: "unique-slug-4",
        title: "Object 4",
        body: "This is the body of object 4.",
      },
      {
        slug: "unique-slug-5",
        title: "Object 5",
        body: "This is the body of object 5.",
      },
      {
        slug: "unique-slug-6",
        title: "Object 6",
        body: "This is the body of object 6.",
      },
      {
        slug: "unique-slug-7",
        title: "Object 7",
        body: "This is the body of object 7.",
      },
      {
        slug: "unique-slug-8",
        title: "Object 8",
        body: "This is the body of object 8.",
      },
      {
        slug: "unique-slug-9",
        title: "Object 9",
        body: "This is the body of object 9.",
      },
      {
        slug: "unique-slug-10",
        title: "Object 10",
        body: "This is the body of object 10.",
      },
      {
        slug: "unique-slug-11",
        title: "Object 11",
        body: "This is the body of object 11.",
      },
      {
        slug: "unique-slug-12",
        title: "Object 12",
        body: "This is the body of object 12.",
      },
      {
        slug: "unique-slug-13",
        title: "Object 13",
        body: "This is the body of object 13.",
      },
      {
        slug: "unique-slug-14",
        title: "Object 14",
        body: "This is the body of object 14.",
      },
      {
        slug: "unique-slug-15",
        title: "Object 15",
        body: "This is the body of object 15.",
      },
      {
        slug: "unique-slug-16",
        title: "Object 16",
        body: "This is the body of object 16.",
      },
      {
        slug: "unique-slug-17",
        title: "Object 17",
        body: "This is the body of object 17.",
      },
      {
        slug: "unique-slug-18",
        title: "Object 18",
        body: "This is the body of object 18.",
      },
      {
        slug: "unique-slug-19",
        title: "Object 19",
        body: "This is the body of object 19.",
      },
      {
        slug: "unique-slug-20",
        title: "Object 20",
        body: "This is the body of object 20.",
      },
    ],
  });
};
// addPost();

// try {
//   addPost();
  
// } catch (error) {
//   console.log(error);
  
// }


module.exports = {
  router,
};
