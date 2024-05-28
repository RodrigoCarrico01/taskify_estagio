// middleware/authMiddleware.js
const admin = require('../config/firebase');

exports.isAuthenticated = async (req, res, next) => {
  if (process.env.FAKE_AUTH === 'true') {
    req.user = {
      uid: 'fake-uid',
      email: 'fakeuser@gmail.com',
      emailVerified: true,
      displayName: 'Fake User'
    };
    next();
  } else {
  const sessionCookie = req.cookies.session || '';

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    req.user = decodedClaims;
    next();
    
  } catch (error) {
    res.redirect('/login');
  }
}
};

exports.isNotAuthenticated = (req, res, next) => {
  const sessionCookie = req.cookies.session || '';
  if (sessionCookie) {
    res.redirect('/profile');
  } else {
    next();
  }
};
