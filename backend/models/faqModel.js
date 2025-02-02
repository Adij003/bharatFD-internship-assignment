const mongoose = require('mongoose');

const faqSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    question: {
      type: String,
      required: [true, 'Please add a description'],
    },
    answer: {
      type: String,
    },
    translations: {
      type: Map,
      of: {
        question: String,
        answer: String
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Faq', faqSchema);
