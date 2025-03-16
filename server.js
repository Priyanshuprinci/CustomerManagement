const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use("/api", customerRoutes);

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// Handle server errors (e.g., port in use)
server.on('error', (err) => {
  console.error(`❌ Server error: ${err.message}`);
  process.exit(1);
});
