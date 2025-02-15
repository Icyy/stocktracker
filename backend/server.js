require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolioRoutes');
require('./config/passport');  



// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Optional if using embedding
  next();
});
// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(cors());

// Google OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to portfolio page after successful login
    res.redirect('http://localhost:3000/portfolio');
  }
);

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// portfolio routes
app.use('/api', portfolioRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
