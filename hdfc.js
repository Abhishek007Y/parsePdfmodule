function Hdfcpassbook(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    console.log(lines);
    const accountInfo = lines[5].match(/Savings Account No\.:\s+(\d+)\s*,\s*(.*)/);
    const accountNumber = accountInfo[1];
    const accountName = accountInfo[2];
  
    const transactions = lines.slice(9, -1).map(line => {
      const parts = line.split(/\s+/);
      const date = parts.shift();
      const narration = parts.shift();
      const chequeRefNo = parts.shift();
      const valueDate = parts.shift();
      const withdrawal = parseFloat(parts.shift()) || 0;
      const deposit = parseFloat(parts.shift()) || 0;
      const closingBalance = parseFloat(parts.shift());
      console.log(date,narration);
  
      return { date, narration, chequeRefNo, valueDate, withdrawal, deposit, closingBalance };
    });
  
    const columns = {
      Date: transactions.map(t => t.date),
      Narration: transactions.map(t => t.narration),
      ChequeRefNo: transactions.map(t => t.chequeRefNo),
      ValueDate: transactions.map(t => t.valueDate),
      Withdrawal: transactions.map(t => t.withdrawal),
      Deposit: transactions.map(t => t.deposit),
      ClosingBalance: transactions.map(t => t.closingBalance),
    };
  
    return { accountNumber, accountName, transactions, columns };
  }
  

  module.exports=Hdfcpassbook;