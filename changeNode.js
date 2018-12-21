const fs = require('fs')
const operationFile = './dist/tezos/TezosOperations.js'

fs.readFile(operationFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }

  const replaceItem = `
    let LedgerUtils;
    // #if !ISWEB
      LedgerUtils = require('../utils/LedgerUtils');
    // #endif
  `;

  const result = data.replace("const LedgerUtils = require('../utils/LedgerUtils');", replaceItem);

  fs.writeFile(operationFile, result, 'utf8', function(err) {
    if (err) {
      return console.log(err)
    }
  })
})
