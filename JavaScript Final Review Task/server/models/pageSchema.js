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
  publishTime: {
    type: Number,
  },
  toBePublished: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  modifiedBy: {
    type: String,
  },
  modifiedByName: {
    type: String,
    // required: true,
  },
  modifiedAt: {
    type: Number,
  },
});

const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
