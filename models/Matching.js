const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Matching = sequelize.define('Matching', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  donationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'donations',
      key: 'id'
    }
  },
  foodBankId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'food_banks',
      key: 'id'
    }
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    }
  },
  matchScore: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    comment: 'AI-calculated matching score (0-100)'
  },
  matchingCriteria: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Criteria used for matching (distance, capacity, food type, etc.)'
  },
  distance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Distance in kilometers between business and food bank'
  },
  estimatedDeliveryTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Estimated delivery time in minutes'
  },
  status: {
    type: DataTypes.ENUM(
      'proposed',
      'accepted',
      'rejected',
      'confirmed',
      'in_transit',
      'delivered',
      'completed',
      'cancelled',
      'disputed'
    ),
    defaultValue: 'proposed'
  },
  proposedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  respondedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  confirmedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  pickupTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deliveryTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  transportMethod: {
    type: DataTypes.ENUM('business_delivery', 'foodbank_pickup', 'volunteer', 'third_party'),
    allowNull: true
  },
  volunteerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  deliveryAddress: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  deliveryNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pickupCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Verification code for pickup'
  },
  deliveryCode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Verification code for delivery'
  },
  actualQuantityDelivered: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  qualityRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  feedbackFromBusiness: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  feedbackFromFoodBank: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  issues: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Any issues encountered during the matching process'
  },
  regulatoryChecksPassed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  regulatoryCheckDetails: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Details of regulatory compliance checks'
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cancelledBy: {
    type: DataTypes.ENUM('business', 'foodbank', 'system', 'admin'),
    allowNull: true
  },
  impactMetrics: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Calculated impact metrics (meals saved, CO2 reduced, etc.)'
  }
}, {
  tableName: 'matchings',
  timestamps: true,
  indexes: [
    {
      fields: ['donationId']
    },
    {
      fields: ['foodBankId']
    },
    {
      fields: ['businessId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['proposedAt']
    },
    {
      fields: ['volunteerId']
    }
  ]
});

module.exports = Matching;
