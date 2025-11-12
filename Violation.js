const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Violation = sequelize.define('Violation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  violatorType: {
    type: DataTypes.ENUM('business', 'foodbank', 'user'),
    allowNull: false
  },
  violatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ID of the violating entity (business, foodbank, or user)'
  },
  violationType: {
    type: DataTypes.ENUM(
      'food_safety',
      'false_information',
      'no_show',
      'quality_issue',
      'regulatory_compliance',
      'harassment',
      'fraud',
      'other'
    ),
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  relatedDonationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'donations',
      key: 'id'
    }
  },
  relatedMatchingId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'matchings',
      key: 'id'
    }
  },
  reportedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  evidence: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of evidence URLs (images, documents)'
  },
  investigationNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(
      'reported',
      'under_investigation',
      'verified',
      'dismissed',
      'resolved',
      'escalated'
    ),
    defaultValue: 'reported'
  },
  actionTaken: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Description of actions taken to resolve the violation'
  },
  penalties: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Array of penalties applied (warnings, suspensions, bans)'
  },
  regulatoryReported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether reported to regulatory authorities'
  },
  regulatoryReferenceNumber: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  investigatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  investigationStartDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  investigationEndDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  resolvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  appealSubmitted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  appealNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  appealDecision: {
    type: DataTypes.ENUM('pending', 'upheld', 'overturned', 'modified'),
    allowNull: true
  },
  preventiveMeasures: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Measures taken to prevent future violations'
  },
  internalNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Internal notes for admin use only'
  }
}, {
  tableName: 'violations',
  timestamps: true,
  indexes: [
    {
      fields: ['violatorType', 'violatorId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['severity']
    },
    {
      fields: ['violationType']
    },
    {
      fields: ['reportedBy']
    },
    {
      fields: ['investigatedBy']
    }
  ]
});

module.exports = Violation;
