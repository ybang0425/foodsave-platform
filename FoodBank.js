const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodBank = sequelize.define('FoodBank', {
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
  organizationName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  organizationType: {
    type: DataTypes.ENUM('nonprofit', 'government', 'religious', 'community', 'school'),
    allowNull: false
  },
  registrationNumber: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '비영리단체 등록번호'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mission: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '단체의 미션과 비전'
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
  emergencyContact: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  operatingHours: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'JSON object with days as keys and hours as values'
  },
  capacity: {
    type: DataTypes.INTEGER,
    comment: 'Maximum number of meals that can be handled per day'
  },
  currentNeed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Current number of meals needed'
  },
  beneficiaryCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of beneficiaries served'
  },
  beneficiaryTypes: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Types of beneficiaries (elderly, children, disabled, etc.)'
  },
  storageCapacity: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Storage capabilities (refrigerated, frozen, dry)'
  },
  transportationAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  vehicleCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  documents: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Required documents for verification'
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalReceived: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Total number of donations received'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verifiedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  verificationDocuments: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Documents submitted for verification'
  },
  preferredFoodTypes: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Preferred types of food donations'
  },
  restrictedFoodTypes: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Food types that cannot be accepted'
  },
  deliveryPreferences: {
    type: DataTypes.JSON,
    defaultValue: {},
    comment: 'Preferred delivery times and methods'
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
  tableName: 'food_banks',
  timestamps: true,
  indexes: [
    {
      fields: ['latitude', 'longitude']
    },
    {
      fields: ['organizationType']
    },
    {
      fields: ['isActive', 'isVerified']
    }
  ]
});

module.exports = FoodBank;
