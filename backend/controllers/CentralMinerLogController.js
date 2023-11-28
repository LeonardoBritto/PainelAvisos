const moment = require('moment')
const {buscaPorCnpj, buscaTodosLogMiner, inserirAvisoCentralMinerLog} = require('../db/ConexaoBanco')
const geraLog = require('../helpers/gerar-log')

module.exports = class CentralMinerLogController {
    static async listar(req, res) {
        const cnpj = req.params.cnpj

        const existe = await buscaPorCnpj(cnpj)

        if(!existe)
            return res.status(404).json({message: "Cliente não esta cadastrado!"})

        const avisos = await buscaTodosLogMiner(existe.codigo)
        
        return res.status(200).json({avisos: avisos})
    }

    static async inserir(req, res) {
        const {cnpjcliente} = req.body
        const tamanhoDosDados = req.get('Content-Length') 
        
        const existe = await buscaPorCnpj(cnpjcliente)

        if(!existe)
            return res.status(404).json({message: "Cliente não esta cadastrado!"})

        geraLog(`Central Mineradora Log - ${existe.nome} - ${tamanhoDosDados} bytes`)

        let centralObj = []
        centralObj.push(moment().format('YYYY-MM-DD HH:mm:ss'))

        const bodyKeys = Object.keys(req.body)

        for (let i = 0; i < bodyKeys.length - 1; i++) {            
            centralObj.push(req.body[bodyKeys[i]])            
        }

        centralObj.push(existe.codigo)

        inserirAvisoCentralMinerLog(centralObj).then(() => {
            res.status(201).json({mensagem: 'Log da Mineradora inserido com sucesso.'})    
        }).catch((error) => {
            console.log('Erro ao inserir log da mineradora:', error)
            return res.status(500).json({ message: 'Erro ao inserir log da mineradora.' })
        })
    }
}