const { sequelize } = require('../config/database');
const User = require('./User');
const Business = require('./Business');
const FoodBank = require('./FoodBank');
const Donation = require('./Donation');
const Matching = require('./Matching');
const Violation = require('./Violation');

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasOne(Business, { 
    foreignKey: 'userId',
    as: 'business',
    onDelete: 'CASCADE'
  });
  
  User.hasOne(FoodBank, { 
    foreignKey: 'userId',
    as: 'foodBank',
    onDelete: 'CASCADE'
  });

  // Business associations
  Business.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'user'
  });
  
  Business.hasMany(Donation, { 
    foreignKey: 'businessId',
    as: 'donations',
    onDelete: 'CASCADE'
  });
  
  Business.hasMany(Matching, { 
    foreignKey: 'businessId',
    as: 'matchings'
  });

  // FoodBank associations
  FoodBank.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'user'
  });
  
  FoodBank.hasMany(Matching, { 
    foreignKey: 'foodBankId',
    as: 'matchings'
  });
  
  FoodBank.hasMany(Donation, {
    foreignKey: 'matchedFoodBankId',
    as: 'receivedDonations'
  });

  // Donation associations
  Donation.belongsTo(Business, { 
    foreignKey: 'businessId',
    as: 'business'
  });
  
  Donation.belongsTo(FoodBank, { 
    foreignKey: 'matchedFoodBankId',
    as: 'matchedFoodBank'
  });
  
  Donation.hasMany(Matching, { 
    foreignKey: 'donationId',
    as: 'matchingAttempts'
  });
  
  Donation.hasMany(Violation, {
    foreignKey: 'relatedDonationId',
    as: 'violations'
  });

  // Matching associations
  Matching.belongsTo(Donation, { 
    foreignKey: 'donationId',
    as: 'donation'
  });
  
  Matching.belongsTo(FoodBank, { 
    foreignKey: 'foodBankId',
    as: 'foodBank'
  });
  
  Matching.belongsTo(Business, { 
    foreignKey: 'businessId',
    as: 'business'
  });
  
  Matching.belongsTo(User, { 
    foreignKey: 'volunteerId',
    as: 'volunteer'
  });
  
  Matching.hasMany(Violation, {
    foreignKey: 'relatedMatchingId',
    as: 'violations'
  });

  // Violation associations
  Violation.belongsTo(User, {
    foreignKey: 'reportedBy',
    as: 'reporter'
  });
  
  Violation.belongsTo(User, {
    foreignKey: 'investigatedBy',
    as: 'investigator'
  });
  
  Violation.belongsTo(Donation, {
    foreignKey: 'relatedDonationId',
    as: 'donation'
  });
  
  Violation.belongsTo(Matching, {
    foreignKey: 'relatedMatchingId',
    as: 'matching'
  });
};

// Initialize associations
defineAssociations();

// Sync database (be careful with force and alter options in production)
const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options);
    console.log('✅ Database models synchronized successfully');
  } catch (error) {
    console.error('❌ Error synchronizing database models:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Business,
  FoodBank,
  Donation,
  Matching,
  Violation,
  syncDatabase
};
