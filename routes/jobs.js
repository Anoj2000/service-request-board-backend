const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');
const auth = require('../middleware/auth');

// GET all jobs - NO AUTH REQUIRED (anyone can view)
router.get('/', async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET single job - NO AUTH REQUIRED
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// POST new job - AUTH REQUIRED
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } = req.body;
    
    if (!title || !description || !category || !location || !contactName || !contactEmail) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newJob = new JobRequest({
      ...req.body,
      createdBy: req.user.userId
    });
    
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    next(error);
  }
});

// PATCH update status - NO AUTH (tradespeople can update)
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }  // ✅ FIXED - was { new: 'after' }
    );
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// DELETE job - AUTH REQUIRED
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;