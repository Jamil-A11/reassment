const axios = require('axios');

axios.get('http://localhost:5050/physiotherapists')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
