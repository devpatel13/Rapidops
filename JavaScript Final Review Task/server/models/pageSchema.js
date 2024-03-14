const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  bodyContent: {
    type: String,
    required: true,
  },
  //   url
  slug: {
    type: String,
    required: true,
  },
  showAuth: {
    type: Boolean,
  },
  publishDate: {
    type: Date,
  },
  publishTime: {
    type: Date,
  },
  status: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedBy: {
    type: String,
  },
  modifiedAt: {
    type: Date,
  },
});

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
