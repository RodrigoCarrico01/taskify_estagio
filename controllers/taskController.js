const axios = require('axios');
const { getAuthorizationToken } = require('../utils/authFormaloo');
const admins = require('../config/admins.json').admins;
const moment = require('moment'); // Adicionar a biblioteca moment.js para manipulação de datas

const filterTasksByDate = (tasks, filter) => {
  const now = moment();
  return tasks.filter(task => {
    const taskDate = moment(task.rendered_data['6S3ZodpU'].value, "DD-MM-YYYY"); // Garantir que a data seja interpretada corretamente
    switch (filter) {
      case 'week':
        return taskDate.isSame(now, 'week');
      case 'month':
        return taskDate.isSame(now, 'month');
      case 'year':
        return taskDate.isSame(now, 'year');
      default:
        return true;
    }
  });
};

exports.getTasks = async (req, res) => {
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';
  const itemsPerPage = 20;
  const currentPage = parseInt(req.query.page) || 1;
  const userEmail = req.user.email;
  const query = req.query.query || '';
  const dateFilter = req.query.dateFilter || 'all'; // Adicionar o filtro de data

  try {
    let authorizationToken = await getAuthorizationToken();
    let tasks = [];
    let nextUrl;

    if (admins.includes(userEmail)) {
      nextUrl = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=999${query ? `&search=${query}` : ''}`;
    } else {
      nextUrl = `https://api.formaloo.net/v3/forms/m3fK0cg3/rows?page_size=999&search=${userEmail}${query ? ` ${query}` : ''}`;
    }

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

    // Filtrar tarefas pela data
    tasks = filterTasksByDate(tasks, dateFilter);

    // Ordenar tarefas das mais recentes para as mais antigas
    tasks = tasks.sort((a, b) => moment(b.rendered_data['6S3ZodpU'].value, "DD-MM-YYYY") - moment(a.rendered_data['6S3ZodpU'].value, "DD-MM-YYYY"));

    // Processando os dados dos anexos para garantir que a URL correta seja passada para a view
    tasks = tasks.map(task => {
      Object.keys(task.rendered_data).forEach(key => {
        if (task.rendered_data[key] && typeof task.rendered_data[key].value === 'string') {
          // Extraindo a URL correta se o valor for um link HTML
          const match = task.rendered_data[key].value.match(/href="([^"]*)"/);
          if (match) {
            task.rendered_data[key].value = match[1];
          }
        }
      });
      return task;
    });

    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / itemsPerPage);
    const paginatedTasks = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    res.render('tasks', {
      tasks: paginatedTasks,
      currentPage,
      totalPages,
      query,
      dateFilter // Passar o filtro de data para a view
    });
  } catch (error) {
    res.status(400).send('Erro ao obter tarefas: ' + error.message);
  }
};


exports.getTaskDescription = async (req, res) => {
  const submitCode = req.params.submitCode; // Usar o submit_code único da tarefa
  const apiKey = 'key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==';

  try {
    let authorizationToken = await getAuthorizationToken();
    const response = await axios.get(`https://api.formaloo.net/v3/forms/m3fK0cg3/rows`, {
      headers: {
        'x-api-key': apiKey,
        'Authorization': `JWT ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        search: submitCode
      }
    });

    const task = response.data.data.rows.find(row => row.submit_code === submitCode);

    // Extrair URLs dos anexos
    const anexos = ['zHJ08uHz', 'eRv22zzj', 'xfCb1Den', '82P5aHnp', 'aoDSWJnM']
      .filter(anexo => task.rendered_data[anexo] && task.rendered_data[anexo].value)
      .map(anexo => {
        const value = task.rendered_data[anexo].value;
        const match = value.match(/href="([^"]*)"/);
        return match ? match[1] : value;
      });

    res.render('taskDescription', { task, anexos });
  } catch (error) {
    res.status(400).send('Erro ao obter a descrição da tarefa: ' + error.message);
  }
};