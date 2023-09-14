const {buscaIp} = require('../db/ConexaoBanco')
const geraLog = require('./gerar-log')

const checarIp = async (req, res, next) => {
    let ipacesso = '::1'
    
    if(req.ip != '::1')
        ipacesso = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]

    buscaIp(ipacesso).then((existe) => {
        if(!existe){
            geraLog(`Acesso Negado! - IP Bloqueado (${existe.ipacesso})`)
            return res.status(401).json({message: "Acesso Negado! - Ip Bloqueado"})
        }
        geraLog(`Acesso Concedido a ${existe.nome}: (${existe.ipacesso})`)
        next()    
    }).catch((error) => {
        geraLog('Erro ao localizar IP')
        return res.status(500).json({ message: 'Erro ao localizar IP' })  
    })
}

module.exports = checarIp