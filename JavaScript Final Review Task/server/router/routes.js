const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/authenticate");

require("../db/connect");
router.use(cookieParser());
const User = require("../models/userSchema");
const Page = require("../models/pageSchema");

// get requests
router.get("/", (req, res) => {
  // res.redirect('/home');
  // logic to check if the user have any pages if not then redirect to homepage
  // or else redirect to home page
});
// router.get('/home')
router.get("/signup", (req, res) => {
  res.status(200).send("Signup");
});
router.get("/blogpage/:slug", async (req, res) => {
  const slug = req.params.slug;
  const slugExists = await Page.findOne({ slug });

  if (slugExists) {
    const currenDate = Date.now();
    if (slugExists.publishTime < currenDate)
      res.status(200).json({ slug: "Page published" });
    else res.status(200).json({ slug: "Page scheduled" });
  } else res.status(404).json({ error: "Page does not exists" });
});
router.get("/allpages", authenticate, async (req, res) => {
  const allPages = await Page.find();
  res.json({ pages: allPages, isAuthenticated: true });
});
router.get("/addpage", authenticate, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

//post requests
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  let isSubscribed = req.body.isSubscribed;

  if (!username || !password) {
    return res.status(400).json({ error: "Fill all Fields" });
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "User already Exists" });
    }

    // encodePass
    const encryptedPass = await bcrypt.hash(password, 10);
    const profilePicID = Math.floor(Math.random() * 6);
    if (!isSubscribed) isSubscribed = true;

    const user = await User.create({
      username,
      password: encryptedPass,
      email,
      profilePicID,
      isSubscribed,
    });

    if (user) {
      res.status(201).json({ message: "User Registered" });
    }
  } catch (error) {
    // res.status();
    console.log(error);
  }
});

router.post("/addpage", authenticate, async (req, res) => {
  const { title, subTitle, bodyContent, slug } = req.body;
  // console.log(req.user);
  const createdBy = req.user.username;
  if (!title || !subTitle || !bodyContent || !slug || !createdBy)
    return res.status(401).json({ error: "Fill all the required fields" });

  try {
    const slugExists = await Page.findOne({ slug });

    if (slugExists)
      return res.status(409).json({ error: "Slug already exists" });

    const createdAt = Date.now();

    let { showAuth, toBePublished } = req.body;

    if (!showAuth) showAuth = false;
    let publishDateObject;
    if (!toBePublished) {
      toBePublished = false;
      publishDateObject = 0;
    } else {
      const { publishDate, publishTime } = req.body;
      if (!publishDate || !publishTime)
        return res
          .status(401)
          .json({ error: "publish date and publish time are required" });
      else {
        const [day, month, year] = publishDate.split("/");
        // console.log(publishTime);
        const [hours, minutes, period] = publishTime.split(":");
        let parsedHours = parseInt(hours);
        if (period.toLowerCase() === "am" && parsedHours === 12)
          parsedHours = 0;
        else if (period.toLowerCase() === "pm" && parsedHours !== 12)
          parsedHours += 12;

        publishDateObject = new Date(
          parseInt(year),
          parseInt(month - 1),
          parseInt(day),
          parsedHours,
          parseInt(minutes)
        ).getTime();
      }
    }

    const page = await Page.create({
      title,
      subTitle,
      bodyContent,
      slug,
      showAuth,
      publishTime: publishDateObject,
      toBePublished,
      createdBy,
      createdAt,
    });

    if (page) res.status(201).json({ success: "page created" });
  } catch (error) {
    console.log(error);
  }
});
// registration using username, Can change later
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: "Please enter username/password" });

    const userExist = await User.findOne({ username });

    if (userExist) {
      const isPasswordMatched = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!isPasswordMatched)
        return res.status(401).json({ error: "Invalid credentials" });
      else {
        const token = jwt.sign({ id: userExist._id }, process.env.SECERET_KEY, {
          expiresIn: "2h",
        });
        let user = {};
        user.token = token;
        user.username = userExist.username;
        user.isSubscribed = userExist.isSubscribed;
        user.profilePicID = userExist.profilePicID;
        serializedUser = JSON.stringify(user);

        //cookies
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100), // for 3days
          httpOnly: true,
        };
        res.status(200).cookie("user", serializedUser, options).json({
          success: true,
        });
      }
    } else res.status(401).json({ error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
});

router.delete("/addpage/:pageID", async (req, res) => {
  const pageID = req.params.pageID;

  if (!pageID) res.send(400).json({ error: "id not found" });

  try {
    const isDeleted = await Page.deleteOne({ _id: pageID });
    if (isDeleted.deletedCount)
      return res
        .status(200)
        .json({ message: "page deleted", status: isDeleted });
    else return res.status(422).json({ error: "Page not deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/addpage/:pageID", async (req, res) => {
  const pageID = req.params.pageID;
  const { title, subTitle, bodyContent, slug, modifiedBy } = req.body;
  if (!title || !subTitle || !bodyContent || !modifiedBy)
    return res.status(401).json({ error: "Fill all the required fields" });

  try {
    if (slug) {
      const slugExists = await Page.findOne({ slug });
      if (slugExists)
        return res.status(409).json({ error: "Slug already exists" });
      // else slug = slugExists.slug;
    }
    let { showAuth, toBePublished } = req.body;
    if (!showAuth) showAuth = false;

    let publishDateObject;
    if (!toBePublished) {
      toBePublished = false;
      publishDateObject = 0;
    } else {
      const { publishDate, publishTime } = req.body;
      if (!publishDate || !publishTime)
        return res
          .status(401)
          .json({ error: "publish date and publish time are required" });
      else {
        const [day, month, year] = publishDate.split("/");
        // console.log(publishTime);
        const [hours, minutes, period] = publishTime.split(":");
        let parsedHours = parseInt(hours);
        if (period.toLowerCase() === "am" && parsedHours === 12)
          parsedHours = 0;
        else if (period.toLowerCase() === "pm" && parsedHours !== 12)
          parsedHours += 12;

        publishDateObject = new Date(
          parseInt(year),
          parseInt(month - 1),
          parseInt(day),
          parsedHours,
          parseInt(minutes)
        ).getTime();
      }
    }

    const modifiedAt = Date.now();

    const isUpdated = await Page.updateOne(
      { _id: pageID },
      {
        $set: {
          title,
          subTitle,
          bodyContent,
          slug,
          showAuth,
          modifiedAt,
          modifiedBy,
          toBePublished,
          publishTime: publishDateObject,
        },
      }
    );

    if (isUpdated.modifiedCount) {
      res.status(200).json({ message: "Page updated", status: isUpdated });
    } else res.status(401).json({ error: "Error updating page" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
