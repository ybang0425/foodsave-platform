const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create Sequelize instance with MariaDB
const sequelize = new Sequelize(
  process.env.DB_NAME || 'foodsave_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Asia/Seoul',
      connectTimeout: 60000,
      // SSL configuration for Cloudtype
      ...(process.env.NODE_ENV === 'production' && {
        ssl: {
          rejectUnauthorized: false
        }
      })
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MariaDB connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the MariaDB database:', error);
  }
};

module.exports = {
  sequelize,
  testConnection
};
