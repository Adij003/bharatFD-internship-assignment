const asyncHandler = require('express-async-handler');
const Faq = require('../models/faqModel');
const User = require('../models/userModel');
const client = require('../config/redisClient')
// @desc Get all FAQs for a user
// @route GET /api/faqs/me
// @access private
const getFaqs = asyncHandler(async (req, res) => {
    const cacheKey = 'faqs:all'
    const cachedFaqs = await client.get(cacheKey)
    if(cachedFaqs){
        console.log('So now we are serving from cache')
        return res.status(200).json(JSON.parse(cachedFaqs))
    }

    const faqs = await Faq.find(); // Fetch all FAQs
    await client.setEx(cacheKey, 3600, JSON.stringify(faqs));
    console.log('Serving from DB')

    res.status(200).json(faqs);
});


// @desc Get a single FAQ
// @route GET /api/faqs/:id
// @access private
const getFaq = asyncHandler(async (req, res) => {
    const cacheKey = `faq:${req.params.id}`;

    
    const cachedFaq = await client.get(cacheKey);
    if (cachedFaq) {
        console.log('Serving from cache');
        return res.status(200).json(JSON.parse(cachedFaq)); // Serve from cache
    }

    
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
        res.status(404);
        throw new Error('FAQ not found');
    }

    
    await client.setEx(cacheKey, 3600, JSON.stringify(faq));

    console.log('Serving from database');
    res.status(200).json(faq);
});

// @desc Create an FAQ (User asks a question)
// @route POST /api/faqs
// @access private
const createFaq = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;

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

   // clearing cache since data that we previously fetched has changed
   await client.del('faqs:all');


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

    await client.del(`faq:${req.params.id}`);
    await client.del('faqs:all');

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

    
    await redisClient.del("faqs");

    res.status(200).json({ success: true });
});

module.exports = {
    getFaqs,
    getFaq,
    createFaq,
    updateFaq,
    deleteFaq,
};
