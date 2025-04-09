const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const taskRoutes = require('./routes/tasks');

require('dotenv').config();
dbConnection();

app.use(express.json());
app.use('/', taskRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
