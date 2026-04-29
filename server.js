const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const pharmacyRoutes = require('./routes/pharmacy');
const searchRoutes = require('./routes/search');

app.use('/api/auth', authRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
