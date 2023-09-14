const fs = require('fs')
const { format } = require('date-fns')

const geraLog = (msg) => {
    const data = new Date()
    const dataFormatada = format(data, 'dd/MM/yyyy HH:mm:ss');
    const linha = `${dataFormatada} - ${msg}\n`

    fs.appendFile('LogInterno.log', linha, (err) => {
        if (err) {
        // Lida com erros de escrita no arquivo
        console.error('Ocorreu um erro ao escrever no arquivo:', err);
        } else {
        console.log('Mensagem adicionada ao arquivo com sucesso!');
        }
    });
}

module.exports = geraLog