const mongoose = require("mongoose");
const DB = process.env.DATABASE;

(async function () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();

// mongoose.set("strictQuery", true);
// mongoose.connect(DB, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("connection established");
//   }
// });
