const express = require('express');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const router = express.Router();

// Get user portfolio
router.get('/portfolio', async (req, res) => {
  try {
    const user = req.user;  // User information from the passport session
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add or update a stock in the user's portfolio
router.post('/portfolio', async (req, res) => {
  try {
    const user = req.user;  // User information from the passport session
    const { ticker, quantity, purchasePrice } = req.body;

    // Find existing portfolio or create a new one
    let portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      portfolio = new Portfolio({ userId: user._id, stocks: [] });
    }

    // Check if the stock already exists in the portfolio
    const stockIndex = portfolio.stocks.findIndex(stock => stock.ticker === ticker);
    if (stockIndex !== -1) {
      // Update the existing stock
      portfolio.stocks[stockIndex].quantity += quantity;  // Update the quantity
    } else {
      // Add a new stock
      portfolio.stocks.push({ ticker, quantity, purchasePrice });
    }

    // Save the portfolio
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a stock from the user's portfolio
router.delete('/portfolio', async (req, res) => {
  try {
    const user = req.user;
    const { ticker } = req.body;

    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

    // Remove stock from portfolio
    portfolio.stocks = portfolio.stocks.filter(stock => stock.ticker !== ticker);
    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
