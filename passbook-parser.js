// const fs = require('fs');
// const PDFParser = require('pdf-parse');
// const happyLoans = require('./happyLoans.js'); 
// const pdfToCsv=require('./PdfToCsv.js');


// const pdfFileName = process.argv[2];
// const partnerName = process.argv[3];
// console.log(`Parsing ${pdfFileName} for ${partnerName}`);

// // ... rest of the script ...


// // ... rest of the script ...


// const pdfPath = pdfFileName;

// fs.readFile(pdfPath, (err, pdfBuffer) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   PDFParser(pdfBuffer).then((pdf) => {
//     // console.log(pdf.text);
//     const statementText = pdf.text;
//     const happyLoansResult = happyLoans(statementText);
//     console.log(happyLoansResult);
//     pdfToCsv(happyLoansResult);

//   }).catch((err) => {
//     console.error(err);
//   });
// });


const fs = require('fs');
const PDFParser = require('pdf-parse');
const happyLoans = require('./happyLoans.js');
const pdfToCsv = require('./PdfToCsv.js');
const refineBobPassbookData =require('./bobPassbook.js');
const Hdfcpassbook = require('./hdfc.js');



function parsePdf(pdfPath, partnerName, callback) {
  fs.readFile(pdfPath, (err, pdfBuffer) => {
    if (err) {
      return callback(err);
    }

    PDFParser(pdfBuffer).then((pdf) => {
      
      const statementText = pdf.text;
      let result;
      // const happyLoansResult = happyLoans(statementText);
      if (partnerName === 'happyLoans') {
        // console.log(statementText);
        result = happyLoans(statementText);

        pdfToCsv(result,"happyLoans");

        // console.log(typeof(result));
      }

      else if (partnerName==='bob'){
        result=refineBobPassbookData(statementText);
        console.log(statementText);
        // pdfToCsv(result,"bob");
      }

      else if(partnerName==='hdfc'){
        result=Hdfcpassbook(statementText);
      }
      return callback(null, result);
    }).catch((err) => {
      return callback(err);
    });
  });
}

module.exports = {
  parsePdf: parsePdf
};

