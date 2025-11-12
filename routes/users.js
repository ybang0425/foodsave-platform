const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET /api/users - Get all users (admin only)
router.get('/', authMiddleware.authenticate, authMiddleware.requireAdmin, async (req, res) => {
  res.json({ message: 'Get all users' });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', authMiddleware.authenticate, async (req, res) => {
  res.json({ message: 'Get user by ID' });
});

// PUT /api/users/:id - Update user
router.put('/:id', authMiddleware.authenticate, async (req, res) => {
  res.json({ message: 'Update user' });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', authMiddleware.authenticate, authMiddleware.requireAdmin, async (req, res) => {
  res.json({ message: 'Delete user' });
});

module.exports = router;
