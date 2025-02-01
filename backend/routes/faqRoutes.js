const express = require('express');
const router = express.Router();
const {
  getFaqs,
  createFaq,
  getFaq,
  deleteFaq,
  updateFaq
} = require('../controllers/faqController');

const { protect } = require('../middleware/authMiddleware');

// Routes for users
router.route('/')
  .get(getFaqs) // Users can view FAQs
  .post(protect, createFaq); // Users can create new FAQs

router.route('/:id')
  .get(protect, getFaq) // Users can view specific FAQs
  .delete(protect, deleteFaq) // Users can delete their own FAQs
  .put(protect, updateFaq); // Admin check will be inside updateFaq controller

module.exports = router; 

// http://localhost:5000/api/faqs/679dd7258e8ffbcad74f7d2e
