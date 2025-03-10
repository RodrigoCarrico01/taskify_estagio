// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const taskRoutes = require('./routes/taskRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', homeRoutes); 
app.use('/', statisticsRoutes);
app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', taskRoutes);


app.use((req, res) => {
  res.status(404).render('404', { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
