// controllers/profileController.js
const admin = require('../config/firebase');

exports.getProfile = async (req, res) => {
  if (process.env.FAKE_AUTH === 'true') {
    // Dados do usuário falso
    const user = {
      uid: 'fake-uid',
      email: 'fakeuser@gmail.com',
      emailVerified: true,
      displayName: 'Fake User'
    };
    res.render('profile', { user });
  } else {
    try {
      const user = await admin.auth().getUser(req.user.uid);
      res.render('profile', { user });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

exports.updateDisplayName = async (req, res) => {
  if (process.env.FAKE_AUTH === 'true') {
    // Simular atualização bem-sucedida
    res.redirect('/profile');
  } else {
    try {
      const { displayName } = req.body;
      const user = await admin.auth().getUser(req.user.uid);
      await admin.auth().updateUser(user.uid, { displayName });
      res.redirect('/profile');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};
