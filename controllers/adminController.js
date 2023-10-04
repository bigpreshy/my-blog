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

    const success = req.flash('message');

    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
          },
    });
    res.render("admin/dashboard", {
      metaInfo,
      posts,
      success,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};

//Add post view
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

//add post POST

const addPost = async (req, res) => {
  try {
    try {
      const title = req.body.title;
      const body = req.body.body;
      const beforeSlug = title.split(" ");
      const slug = beforeSlug.join("-");
      
      const newPost = await prisma.post.create({
        data: {
          title: title,
          body: body,
          slug: slug.toLowerCase(),
        },
      });

      req.flash('message', 'Post added successfully');
      res.redirect("/admin/dashboard");
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.log(error);
  }
};

// edit single view

const editPostPage = async (req, res) => {
  try {
    const metaInfo = {
      title: "Edit Post",
      description: "Free NodeJs Post Management System",
    };

    const success = req.flash('message');
    const post = await prisma.post.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    res.render("admin/edit-post", {
      metaInfo,
      success,
      post,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
};


const editPost = async (req, res) => {

    try {

        const slug = req.body.slug;
        const beforeSlug = slug.split(" ");
        const slugMain = beforeSlug.join("-");

        const updatedPost = await prisma.post.update({
            where: {
              slug: req.params.slug, 
            },
            data: {
              title: req.body.title,
              body: req.body.body,
              slug: slugMain.toLowerCase(),
            //   updatedAt: new Date(), 
            },
          });
    
          req.flash('message', 'Post edited successfully');
        res.redirect(`/admin/edit-post/${slugMain}`);
    
      } catch (error) {
        console.log(error);
      }
}


const deletePost = async(req, res) => {
    try {
        await prisma.post.delete({
            where: {
              slug: req.params.slug, // Assuming 'id' is of type integer
            },
          });

          req.flash('message', 'Post deleted successfully');
        res.redirect('/admin/dashboard');
      } catch (error) {
        console.log(error);
      }
}


const logout = async(req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
}

module.exports = {
  loginPage,
  dashboard,
  loginAdmin,
  register,
  addPostPage,
  editPostPage,
  addPost,
  editPost,
  deletePost,
  logout
};
