const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const pizzaRoutes = require('./routes/pizzaRoutes');
const cartRoutes = require('./routes/cartRoutes');
// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/cart', cartRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API está funcionando');
});

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
