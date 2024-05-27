// middleware/authMiddleware.js
const admin = require('../config/firebase');

exports.isAuthenticated = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';

  try {
    await admin.auth().verifySessionCookie(sessionCookie, true);
    next();
  } catch (error) {
    res.redirect('/login');
  }
};
