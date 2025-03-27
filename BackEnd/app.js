//Databse details for mySqlWorkbench:

//Connection name: Any
//Hostname: databasenameuni.cvmsu4mg4swj.eu-west-2.rds.amazonaws.com
//Username: admin
//Password Recycle999=


const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Database connection using .env variables
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 30000 // 30 seconds timeout
  }
});

// Define the TestTable model
const TestTable = sequelize.define('TestTable', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  Number: {
    type: DataTypes.INTEGER, 
    allowNull: false
  }
}, {
  tableName: 'TestTable', 
  timestamps: false 
});

async function fetchData() {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection to AWS RDS database has been established successfully.');

    await sequelize.sync({ force: false });

    // get all data from TestTable
    const testData = await TestTable.findAll();

    // show data
    if (testData.length > 0) {
      console.log('Data in TestTable:');
      testData.forEach(row => {
        console.log(`ID: ${row.ID}, Number: ${row.Number}`);
      });
    } else {
      console.log('No data found in TestTable.');
    }

  } catch (error) {
    console.error('Error fetching data:');
    console.error(error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

fetchData();

