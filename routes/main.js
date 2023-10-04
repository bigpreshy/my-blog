const express = require("express");
const { homePage, singlePost, search } = require("../controllers/usersViewController");
const { loginPage, loginAdmin, dashboard, register, addPostPage, editPostPage, addPost, editPost, deletePost, logout } = require("../controllers/adminController");
const { authenticatedMiddleware } = require("../middleware/isAdmin");
const router = express.Router();



router.get("", homePage);
router.get("/article/:slug", singlePost);
router.post("/search", search);


router.get("/admin", loginPage)
router.post("/admin", loginAdmin)
router.post("/register", register)

router.get("/admin/dashboard",authenticatedMiddleware, dashboard)
router.get("/admin/add-post", authenticatedMiddleware, addPostPage)
router.post("/admin/add-post", authenticatedMiddleware, addPost)
router.get("/admin/edit-post/:slug", authenticatedMiddleware, editPostPage)
router.put("/admin/edit-post/:slug", authenticatedMiddleware, editPost)
router.delete("/admin/delete-post/:slug", authenticatedMiddleware, deletePost)
router.get("/admin/logout", authenticatedMiddleware, logout)




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


module.exports = {
  router,
};
