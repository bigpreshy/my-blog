const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const adminLayout = "../views/common/admin";
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//Login GET

const loginPage = async (req, res) => {
  // router.get('/admin', async (req, res) => {
  try {
    const metaInfo = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & Prisma.",
    };

    res.render("admin/index", { metaInfo, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
  //   });
};

//Login POST

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

//Register

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
};

//Auth Dashboard

const dashboard = async (req, res) => {
  try {
    const metaInfo = {
      title: "Dashboard",
      description: "Simple Blog created with NodeJs, Express & Prisma.",
    };

    const posts = await prisma.post.findMany();
    res.render("admin/dashboard", {
      metaInfo,
      posts,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

const addPostPage = async (req, res) => {
  try {
    const metaInfo = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & Prisma.",
    };

    // const data = await Post.find();
    res.render("admin/add-post", {
      metaInfo,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

const editPostPage = async (req, res) => {
  try {
    const metaInfo = {
      title: "Edit Post",
      description: "Free NodeJs Post Management System",
    };

    const post = await prisma.post.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    res.render("admin/edit-post", {
        metaInfo,
      post,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginPage,
  dashboard,
  loginAdmin,
  register,
  addPostPage,
  editPostPage
};
