// controllers/statisticsController.js
const axios = require('axios');
const { getAuthorizationToken } = require('../utils/authFormaloo');
const admins = require('../config/admins.json').admins;

exports.getStatistics = async (req, res) => {
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';
  const userEmail = req.user.email;
  let statistics = { totalMinutes: 0, totalAttachments: 0 };

  try {
    let authorizationToken = await getAuthorizationToken();
    let tasks = [];
    let nextUrl = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=999${admins.includes(userEmail) ? '' : `&search=${userEmail}`}`;

    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl, {
          headers: {
            'x-api-key': apiKey,
            'Authorization': `JWT ${authorizationToken}`,
            'Content-Type': 'application/json',
          },
        });

        tasks = tasks.concat(response.data.data.rows);
        nextUrl = response.data.meta && response.data.meta.next ? response.data.meta.next : null;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authorizationToken = await getAuthorizationToken();
        } else {
          throw error;
        }
      }
    }

    statistics.totalMinutes = tasks.reduce((sum, task) => sum + parseInt(task.rendered_data.xWJE73P0.value, 10), 0);
    statistics.totalAttachments = tasks.reduce((sum, task) => sum + ['zHJ08uHz', 'eRv22zzj', 'xfCb1Den', '82P5aHnp', 'aoDSWJnM'].filter(anexo => task.rendered_data[anexo] && task.rendered_data[anexo].value).length, 0);

    // Obter lista de utilizadores para administradores
    let users = [];
    if (admins.includes(userEmail)) {
      users = [...new Set(tasks.map(task => task.rendered_data.pMymcHDh.value))];
    }

    res.render('statistics', {
      statistics,
      isAdmin: admins.includes(userEmail),
      userEmail,
      users,
      selectedUser: null // Definindo selectedUser como null na primeira renderização
    });
  } catch (error) {
    res.status(400).send('Erro ao obter estatísticas: ' + error.message);
  }
};

exports.getUserStatistics = async (req, res) => {
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';
  const { selectedUser } = req.body;
  const currentUser = req.user.email;
  let statistics = { totalMinutes: 0, totalAttachments: 0 };

  try {
    let authorizationToken = await getAuthorizationToken();
    let tasks = [];
    let nextUrl = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=999&search=${selectedUser}`;

    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl, {
          headers: {
            'x-api-key': apiKey,
            'Authorization': `JWT ${authorizationToken}`,
            'Content-Type': 'application/json',
          },
        });

        tasks = tasks.concat(response.data.data.rows);
        nextUrl = response.data.meta && response.data.meta.next ? response.data.meta.next : null;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          authorizationToken = await getAuthorizationToken();
        } else {
          throw error;
        }
      }
    }

    statistics.totalMinutes = tasks.reduce((sum, task) => sum + parseInt(task.rendered_data.xWJE73P0.value, 10), 0);
    statistics.totalAttachments = tasks.reduce((sum, task) => sum + ['zHJ08uHz', 'eRv22zzj', 'xfCb1Den', '82P5aHnp', 'aoDSWJnM'].filter(anexo => task.rendered_data[anexo] && task.rendered_data[anexo].value).length, 0);

    // Obter lista de utilizadores para administradores
    let users = [];
    if (admins.includes(currentUser)) {
      let allTasks = [];
      let nextUrlAll = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=999`;
      while (nextUrlAll) {
        try {
          const response = await axios.get(nextUrlAll, {
            headers: {
              'x-api-key': apiKey,
              'Authorization': `JWT ${authorizationToken}`,
              'Content-Type': 'application/json',
            },
          });

          allTasks = allTasks.concat(response.data.data.rows);
          nextUrlAll = response.data.meta && response.data.meta.next ? response.data.meta.next : null;
        } catch (error) {
          if (error.response && error.response.status === 401) {
            authorizationToken = await getAuthorizationToken();
          } else {
            throw error;
          }
        }
      }
      users = [...new Set(allTasks.map(task => task.rendered_data.pMymcHDh.value))];
    }

    res.render('statistics', {
      statistics,
      isAdmin: true,
      selectedUser,
      users
    });
  } catch (error) {
    res.status(400).send('Erro ao obter estatísticas: ' + error.message);
  }
};
