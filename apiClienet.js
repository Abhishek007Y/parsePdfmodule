const axios = require('axios');

const pdfPath = 'file.pdf';
const partnerName = 'partner_name';

axios.get(`http://localhost:3000/transactions?pdfPath=${pdfPath}&partnerName=${partnerName}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
