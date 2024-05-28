// controllers/taskController.js
const axios = require('axios');
const { getAuthorizationToken } = require('../utils/authFormaloo');

exports.getTasks = async (req, res) => {
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';

  try {
    let authorizationToken = await getAuthorizationToken();

    let tasks = [];
    let nextUrl = 'https://api.formaloo.net/v3/forms/m3fK0cg3/rows';
    
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

        // Update nextUrl to fetch the next set of results if available
        nextUrl = response.data.meta && response.data.meta.next ? response.data.meta.next : null;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If we get a 401 error, refresh the authorization token and retry the request
          authorizationToken = await getAuthorizationToken();
        } else {
          throw error;
        }
      }
    }

    res.render('tasks', { tasks });
  } catch (error) {
    res.status(400).send('Erro ao obter tarefas: ' + error.message);
  }
};
