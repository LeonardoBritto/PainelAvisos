const fs = require('fs')
const { format } = require('date-fns')

const geraLog = (msg) => {
    const data = new Date()
    const dataFormatada = format(data, 'dd/MM/yyyy HH:mm:ss');
    const linha = `${dataFormatada} - ${msg}\n`

    fs.appendFile('LogInterno.log', linha, (err) => {
    
    });
}

module.exports = geraLog