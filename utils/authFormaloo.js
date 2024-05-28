const axios = require('axios');

const getAuthorizationToken = async () => {
  const url = 'https://api.formaloo.net/v1.0/oauth2/authorization-token/';
  const payload = { grant_type: 'client_credentials' };
  const secretKey = 'TnVMTnRTcnhqdHhVb0EwOWdoM2dzdXMySTFqaW9QMmIweGFiaThHYTpoeTY3YjVia3BOTUxjUjNOa1RrSG1lY094djhoS2JEcnM5d0d5RWhSMGNnYVEzajFyeWtZSDhtTFhydnBWSXFhcFc3V3FLN3VaR3ZobG9xT0ZUMTJZRjhTSjhKamd6cUJPMTl1RmR0bVo5dzk1MEljenZBb1FGTW9NcDhqTUVFeg==';

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Basic ${secretKey}`
      }
    });

    if (response.status === 200) {
      return response.data.authorization_token;
    } else {
      throw new Error('Erro ao obter o token de autorização: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    throw new Error('Erro ao obter o token de autorização: ' + error.message);
  }
};

module.exports = { getAuthorizationToken };
