const asyncHandler = require('express-async-handler');
const Faq = require('../models/faqModel');
const User = require('../models/userModel');

// @desc Get all FAQs for a user
// @route GET /api/faqs/me
// @access private
const getFaqs = asyncHandler(async (req, res) => {
    const faqs = await Faq.find(); // Fetch all FAQs

    res.status(200).json(faqs);
});


// @desc Get a single FAQ
// @route GET /api/faqs/:id
// @access private
const getFaq = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const faq = await Faq.findById(req.params.id);
    
    if (!faq) {
        res.status(404);
        throw new Error('FAQ not found');
    }

    // if (faq.user.toString() !== req.user.id) {
    //     res.status(401);
    //     throw new Error('Not authorized');
    // }

    res.status(200).json(faq);
});

// @desc Create an FAQ (User asks a question)
// @route POST /api/faqs
// @access private
const createFaq = asyncHandler(async (req, res) => {
    const { question } = req.body;

    if (!question) {
        res.status(400);
        throw new Error('Please add a question');
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const faq = await Faq.create({
        user: req.user.id,
        question,
    });

    res.status(201).json(faq);
});

// @desc Update FAQ (Admin adds answer)
// @route PUT /api/faqs/:id
// @access private (Admin only)
const updateFaq = asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const faq = await Faq.findById(req.params.id);
    if (!faq) {
        res.status(404);
        throw new Error('FAQ not found');
    }

    if (!req.user.isAdmin) {
        res.status(403);
        throw new Error('Not authorized');
    }

    faq.answer = answer;
    await faq.save();

    res.status(200).json(faq);
});

// @desc Delete FAQ
// @route DELETE /api/faqs/:id
// @access private
const deleteFaq = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const faq = await Faq.findById(req.params.id);
    if (!faq) {
        res.status(404);
        throw new Error('FAQ not found');
    }

    if (faq.user.toString() !== req.user.id && !req.user.isAdmin) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await faq.deleteOne();
    res.status(200).json({ success: true });
});

module.exports = {
    getFaqs,
    getFaq,
    createFaq,
    updateFaq,
    deleteFaq,
};
