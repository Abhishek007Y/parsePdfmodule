function happyLoans(statementText) {
    // Extract loan details
    const loanDetailsRegex = /Loan Details\s*\((.+?)\)/;
    const loanDetailsMatch = statementText.match(loanDetailsRegex);
    const loanDetails = loanDetailsMatch ? loanDetailsMatch[1] : '';
  
    // Extract merchant ID
    const merchantIdRegex = /Merchant Id\s*:\s*(.+?)\n/;
    const merchantIdMatch = statementText.match(merchantIdRegex);
    const merchantId = merchantIdMatch ? merchantIdMatch[1] : '';
  
    // Extract partner name
    const partnerNameRegex = /Partner Name\s*:\s*(.+?)\n/;
    const partnerNameMatch = statementText.match(partnerNameRegex);
    const partnerName = partnerNameMatch ? partnerNameMatch[1] : '';
    // console.log(loanDetails,merchantId,partnerName);

    const transactions = [];
    const transactionRegex = /(\d{2}\/\d{2}\/\d{4})\s*(-?\d+\.\d{2})\s*(.+)\s*(credit|debit)/g;
    const transactionMatches = statementText.matchAll(transactionRegex);
    for (const match of transactionMatches) {
      const date = match[1];
      const amount = parseFloat(match[2]);
      const description = match[3];
      const type = match[4];
      transactions.push({ date, amount, description, type });
    }
    // console.log(transactions)
  
    return { loanDetails, merchantId, partnerName, transactions };
    
  }
  
  module.exports = happyLoans;
  