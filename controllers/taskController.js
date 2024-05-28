const axios = require('axios');
const { getAuthorizationToken } = require('../utils/authFormaloo');

exports.getTasks = async (req, res) => {
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';
  const itemsPerPage = 20;
  const currentPage = parseInt(req.query.page) || 1;

  try {
    let authorizationToken = await getAuthorizationToken();
    let tasks = [];
    let nextUrl = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=max`;

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

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / itemsPerPage);
    const paginatedTasks = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    res.render('tasks', {
      tasks: paginatedTasks,
      currentPage,
      totalPages
    });
  } catch (error) {
    res.status(400).send('Erro ao obter tarefas: ' + error.message);
  }
};
