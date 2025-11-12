const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Donation = sequelize.define('Donation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  foodType: {
    type: DataTypes.ENUM('prepared_meal', 'bakery', 'produce', 'dairy', 'packaged', 'mixed'),
    allowNull: false
  },
  foodCategories: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Specific food categories (Korean, Western, Vegetarian, etc.)'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Number of servings or units'
  },
  unit: {
    type: DataTypes.ENUM('servings', 'kg', 'boxes', 'containers', 'pieces'),
    defaultValue: 'servings'
  },
  expiryTime: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Time by which the food must be consumed'
  },
  pickupStartTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  pickupEndTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('available', 'reserved', 'matched', 'completed', 'cancelled', 'expired'),
    defaultValue: 'available'
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of food image URLs'
  },
  allergens: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'List of allergens present in the food'
  },
  nutritionInfo: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Nutritional information if available'
  },
  preparationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'When the food was prepared'
  },
  storageRequirements: {
    type: DataTypes.ENUM('room_temperature', 'refrigerated', 'frozen'),
    defaultValue: 'room_temperature'
  },
  transportationRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  transportationNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  specialInstructions: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Any special handling or reheating instructions'
  },
  regulatoryCompliance: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Compliance with food safety regulations'
  },
  isHalal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isVegetarian: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isVegan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  estimatedValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Estimated monetary value of the donation'
  },
  actualQuantityDonated: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Actual quantity donated (may differ from initial)'
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  matchedFoodBankId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'food_banks',
      key: 'id'
    }
  },
  matchedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  feedbackFromFoodBank: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  tableName: 'donations',
  timestamps: true,
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['businessId']
    },
    {
      fields: ['matchedFoodBankId']
    },
    {
      fields: ['pickupStartTime', 'pickupEndTime']
    },
    {
      fields: ['foodType']
    }
  ]
});

module.exports = Donation;
