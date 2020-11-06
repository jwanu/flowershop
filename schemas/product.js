const mongoose = require('mongoose');

const { Schema } = mongoose;
const itemlistSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  summary: {
    type: String,
  },
  desc: {
    type: String,
  },
  imgLink: {
    type: String,
  },
  thumb: {
    type: String,
  },
  category: {
    type: Array,
  }
});

module.exports = mongoose.model('Product', itemlistSchema);