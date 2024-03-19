const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var cron = require("node-cron");

const cronJob = async () => {
  const Page = require("./models/pageSchema");
  const User = require("./models/userSchema");

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://devanshupatel:devanshu123@cluster0.pa9rpud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Mongo connected");

    const todatAtEight = new Date();
    todatAtEight.setHours(8, 0, 0, 0);
    const timeAfterTwentyHours = new Date(
      todatAtEight.getTime() + 24 * 60 * 60 * 1000
    );

    const pages = await Page.find({
      publishTime: {
        $gte: todatAtEight,
        $lt: timeAfterTwentyHours,
      },
    });

    console.log(pages);

    let userIDs = [];

    pages.forEach((page) => {
      userIDs.push(page.createdBy);
    });

    const users = await User.find({
      _id: { $in: userIDs },
    });

    users.forEach((user) => {
      sendCustomEmail(user.email, `Your page will be published today.`);
    });

    function sendCustomEmail(recipient, message) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "karthiksinha09@gmail.com",
          pass: "abhgptsehbcbehiv",
        },
      });

      const mailOptions = {
        from: "karthiksinha09@gmail.com",
        to: recipient,
        subject: "Page Published",
        text: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }

    cron.schedule("* * * * * ", () => {
      console.log("cron job running!!");
      sendCustomEmail;
    });
  } catch (error) {
    console.log(error);
  }
};

cronJob();
