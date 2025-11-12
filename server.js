const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./config/database');
// const AdminJS = require('adminjs');
// const AdminJSExpress = require('@adminjs/express');
// const AdminJSSequelize = require('@adminjs/sequelize');

// Load environment variables
dotenv.config();

// Register AdminJS Sequelize adapter
// AdminJS.registerAdapter(AdminJSSequelize);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const donationRoutes = require('./routes/donations');
const { 
  businessesRouter, 
  foodBanksRouter, 
  matchingRouter, 
  subscriptionsRouter, 
  regulationsRouter 
} = require('./routes/index');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/businesses', businessesRouter);
app.use('/api/food-banks', foodBanksRouter);
app.use('/api/matching', matchingRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/regulations', regulationsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// AdminJS Setup
/*
const adminOptions = {
  resources: [
    {
      resource: require('./models/User'),
      options: {
        properties: {
          password: { isVisible: false }
        }
      }
    },
    require('./models/Business'),
    require('./models/FoodBank'),
    require('./models/Donation'),
    require('./models/Matching'),
    require('./models/Violation')
  ],
  branding: {
    companyName: 'FoodSave Admin',
    logo: '/public/logo.png',
    softwareBrothers: false
  },
  rootPath: '/admin'
};

const adminJs = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, adminRouter);
*/

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync database (use { force: false } in production)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      // console.log(`🔗 Admin panel available at http://localhost:${PORT}${adminJs.options.rootPath}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
