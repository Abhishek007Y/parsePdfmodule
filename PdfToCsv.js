const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

function pdfToCsv(resultPassed,str) {
  if(str=="happyLoans"){
  const fields = ['date', 'amount', 'description', 'type'];
  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(resultPassed.transactions);
  }
//   console.log(csv);
else if(str=="bob")
{
  const fields = ['date','desc_and_amount', 'type'];
const opts = { fields };
const parser = new Parser(opts);
const csv = parser.parse(resultPassed.transactions);

}

  const dir = path.join(__dirname, '..', 'csv');
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist`);
    return;
  }
  
  const timestamp=Date.now();
  const filename = path.join(process.cwd(), 'csv', `happyLoansTransactions-${timestamp}.csv`);
  



  try {
    fs.writeFileSync(filename, csv);
    console.log(`CSV file written to ${filename}`);
  } catch (err) {
    console.error(`Error writing CSV file: ${err}`);
  }
  
  console.log("CSV FUNCTION EXECUTED");
}

module.exports = pdfToCsv;
