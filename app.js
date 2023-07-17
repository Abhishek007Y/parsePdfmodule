const express = require('express');
const passbookParser = require('./passbook-parser.js');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs =require('fs');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// const pdfPath = path.join(__dirname, 'happy1.pdf');

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/transactions', (req, res) => {
  const partnerName = req.query.partnerName;
  const pdfPath = req.query.pdfPath;
  // console.log(partnerName,pdfPath);

  if (!pdfPath) {
    return res.status(400).json({ message: 'pdfPath is required' });
  }

  if (partnerName === 'happyLoans') {
    passbookParser.parsePdf(pdfPath, 'happyLoans', (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error parsing PDF' });
      }

    res.json(result);
  });
}
else if (partnerName==='bob'){
  passbookParser.parsePdf(pdfPath, 'bob', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error parsing PDF' });
    }

  res.json(result);
});


}

else if (partnerName==='hdfc'){
  passbookParser.parsePdf(pdfPath, 'hdfc', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error parsing PDF' });
    }

  res.json(result);
});

}
else {
  return res.status(400).json({ message: 'Invalid partnerName' });
}
});



// app.post('/transactions', upload.single('pdf'), (req, res) => {
//   const pdfPath = req.file.path;
//   const partnerName = req.body.partnerName;

//   if (!pdfPath) {
//     return res.status(400).json({ message: 'pdfPath is required' });
//   }

//   if (partnerName === 'happyLoans') {
//     passbookParser.parsePdf(pdfPath, 'happyLoans', (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error parsing PDF' });
//       }

//       res.json(result);
//     });
//   }
//   else if (partnerName === 'bob') {
//     passbookParser.parsePdf(pdfPath, 'bob', (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error parsing PDF' });
//       }

//       res.json(result);
//     });
//   }
//   else {
//     return res.status(400).json({ message: 'Invalid partnerName' });
//   }
// });


app.post('/upload', upload.single('pdf'), (req, res) => {
  const pdfBuffer = req.file.buffer;
  const partnerName = req.body.partnerName;

  // console.log(pdfBuffer,partnerName);

  if (!pdfBuffer) {
    return res.status(400).json({ message: 'pdfBuffer is required' });
  }

  if (partnerName !== 'happyLoans' && partnerName !== 'bob' && partnerName!=='hdfc') {
    return res.status(400).json({ message: 'Invalid partnerName' });
  }

  // Save the PDF file to the root directory with a unique file name
  const fileName = `pdf-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFileSync(filePath, pdfBuffer);

  // Call the passbookParser.parsePdf() function with the path to the saved PDF file

  passbookParser.parsePdf(filePath, partnerName, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error parsing PDF' });
    }

    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
