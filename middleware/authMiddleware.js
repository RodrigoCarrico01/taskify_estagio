// middleware/authMiddleware.js
const admin = require('../config/firebase');

exports.isAuthenticated = async (req, res, next) => {
  const sessionCookie = req.cookies.session || '';

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    req.user = decodedClaims;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

exports.isNotAuthenticated = (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(() => res.redirect('/profile'))
    .catch(() => next());
};