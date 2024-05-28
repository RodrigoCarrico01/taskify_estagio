// controllers/authController.js
const { initializeApp, getApps } = require('firebase/app');
const { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, updateProfile } = require('firebase/auth');
const admin = require('../config/firebase');

// Configurações do Firebase Client SDK
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: process.env.AUTH_DOMAIN_FIREBASE,
  projectId: process.env.PROJECT_ID_FIREBASE,
  appId: process.env.APP_ID_FIREBASE,
  messagingSenderId: process.env.MESSAGING_SENDER_ID_FIREBASE,
  measurementId: process.env.MEASUREMENT_ID_FIREBASE,
  storageBucket: process.env.STORAGE_BUCKET_ID
};

// Inicializar o Firebase apenas se ainda não foi inicializado
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

exports.sendMagicLink = async (req, res) => {
  const { email } = req.body;
  const actionCodeSettings = {
    url: 'http://localhost:3000/auth/verify?email=' + email,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    res.status(200).send('Link mágico enviado para o email.');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.verifyMagicLink = async (req, res) => {
  const { email } = req.query;

  try {
    if (isSignInWithEmailLink(auth, req.url)) {
      await signInWithEmailLink(auth, email, req.url);
      const user = auth.currentUser;
      const token = await user.getIdToken();

      // Set session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });
      res.cookie('session', sessionCookie, { maxAge: expiresIn, httpOnly: true });

      // Set default display name if not already set
      if (!user.displayName) {
        const displayName = email.split('@')[0];
        await updateProfile(user, { displayName });
      }

      res.redirect('/profile');
    } else {
      res.status(400).send('Link de login inválido.');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
};
