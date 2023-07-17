// function refineBobPassbookData(data) {
//   const lines = data.split('\n');
//   const transactions = [];

//   for (let i = 1; i < lines.length; i++) {
//     if(lines[i]===undefined){
//       console.log(lines[i]);
//       continue;
//     }
//     console.log(lines[i]);
//     const fields = lines[i].match(/\b(\d{2}\-\d{2}\-\d{4})\b\s+(.*?)\s+([0-9,-]+)\s+\/(.*)/);
//     if (!fields) {
//       continue;
//     }
//     // const fields = lines[i].split(/(?<=\d)\b\s*/);
//     const date = fields[0];
//     const description = fields[1];
//     // const amount = parseFloat(fields[2].replace(/,/g, ''));
//     const amount = fields.length >= 3 ? parseFloat(fields[2].replace(/,/g, '')) : undefined;
//     const type = fields[3];
//     // if (!date || !description || !amount || !type) {
//     //   continue;
//     // }
//     const transaction = {
//       date,
//       description,
//       amount,
//       type,
//     };

//     transactions.push(transaction);
//   }

//   return transactions;
// }

    
//     module.exports = refineBobPassbookData;

    function refineBobPassbookData(data) {
      const lines = data.split('\n');
      const transactions = [];
    
      const regex = /^(\d{2}-\d{2}-\d{4})(.+?)(\d+\.\d{2})(Debit|Credit)$/gm;  
      // const regex=/^\d{2}-\d{2}-\d{4}\s+(.+?)\s+([\d,]+\.\d{2})\s+(Debit|Credit)$/gm;

      // console.log(regex);
      let match;
  while ((match = regex.exec(data)) !== null) {
    console.log(lines);
    const date = match[1];
    // const description = match[2].trim();
    // const amount = parseFloat(match[3]);
    // const amount = parseFloat(match[3].replace(',', ''));

    const type = match[4];

    const desc_and_amount=match[2]+match[3];

    transactions.push({
      date,
      // description,
      desc_and_amount,
      // amount,
      type,
    });
  }

  return transactions;
    }
    
    module.exports = refineBobPassbookData;
    