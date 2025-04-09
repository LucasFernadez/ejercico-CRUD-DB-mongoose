const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error de conexión:', error.message);
    throw new Error('Error al conectar con la base de datos');
  }
};

module.exports = { dbConnection };
