const mongoose = require('mongoose');
const { getFaqs } = require('../../controllers/faqController');
const Faq = require('../../models/faqModel');
const client = require('../../config/redisClient');

jest.mock('../../config/redisClient');

jest.setTimeout(30000);

// note the test cases are not working, will have to update them, and recheck them

describe('getFaqs Controller', () => {
  let req, res;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB Connection Error:', err);
    });

    mongoose.connection.once('open', () => {
      console.log('✅ Connected to MongoDB for testing');
    });

    await Faq.deleteMany();
    await Faq.create([
      { question: 'What is Node.js?', answer: 'A JavaScript runtime.' },
      { question: 'What is Express?', answer: 'A Node.js framework.' },
    ]);
  });

  beforeEach(() => {
    req = { user: { id: new mongoose.Types.ObjectId() } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Give time for cleanup
  });

  it('should return FAQs from database if cache is empty', async () => {
    client.get.mockResolvedValue(null); // No cache available

    await getFaqs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(client.setEx).toHaveBeenCalled(); // Ensures caching
  });

  it('should return FAQs from cache if available', async () => {
    const cachedFaqs = JSON.stringify([
      { question: 'Cached question?', answer: 'Cached answer.' },
    ]);
    client.get.mockResolvedValue(cachedFaqs); // Mock cache response

    await getFaqs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(JSON.parse(cachedFaqs));
  });
});
