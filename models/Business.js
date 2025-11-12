const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  businessName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  businessType: {
    type: DataTypes.ENUM('restaurant', 'bakery', 'cafe', 'mart', 'franchise', 'other'),
    allowNull: false
  },
  businessRegistrationNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  detailAddress: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  operatingHours: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'JSON object with days as keys and hours as values'
  },
  donationFrequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'occasional'),
    defaultValue: 'occasional'
  },
  averageDonationAmount: {
    type: DataTypes.INTEGER,
    comment: 'Average number of meals per donation'
  },
  certifications: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of certification objects'
  },
  logo: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of image URLs'
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalDonations: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subscriptionTier: {
    type: DataTypes.ENUM('free', 'basic', 'premium', 'enterprise'),
    defaultValue: 'free'
  },
  subscriptionExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of tags for categorization'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  suspendedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  suspensionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'businesses',
  timestamps: true,
  indexes: [
    {
      fields: ['latitude', 'longitude']
    },
    {
      fields: ['businessType']
    },
    {
      fields: ['isActive', 'isVerified']
    }
  ]
});

module.exports = Business;
