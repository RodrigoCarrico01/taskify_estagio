// controllers/taskController.js
const axios = require('axios');

exports.getTasks = async (req, res) => {
  const apiKey = "key_gAAAAABmBbnkRunYWIDY6NMDGwuLnQzbnSpyzXIT4-s_ASTHMFrQ1c_W1zB-EmW1vPX4MLy39kO7SQpOZHntlhjv-hojbGAfuWkgW5k6-7rYLio8dVyU5TpfXQskcQgOeAsk1sOikYQtsxVgwkrtY0iKsLkmX3Romw==";
  const secretKey = "TnVMTnRTcnhqdHhVb0EwOWdoM2dzdXMySTFqaW9QMmIweGFiaThHYTpoeTY3YjVia3BOTUxjUjNOa1RrSG1lY094djhoS2JEcnM5d0d5RWhSMGNnYVEzajFyeWtZSDhtTFhydnBWSXFhcFc3V3FLN3VaR3ZobG9xT0ZUMTJZRjhTSjhKamd6cUJPMTl1RmR0bVo5dzk1MEljenZBb1FGTW9NcDhqTUVFeg==";

  try {
    const response = await axios.get('https://api.formaloo.net/v3/forms/m3fK0cg3/rows', {
      headers: {
        'X-API-Key': apiKey,
        'Authorization': `JWT ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const tasks = response.data.data.rows;
    res.render('tasks', { tasks });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
