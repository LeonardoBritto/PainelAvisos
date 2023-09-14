const moment = require('moment')
const {buscaPorCnpj, buscaTodosLogInter, inserirAvisoCentralInterLog} = require('../db/ConexaoBanco')

module.exports = class CentralInterLogController {
    static async listar(req, res) {
        const cnpj = req.params.cnpj

        const existe = await buscaPorCnpj(cnpj)

        if(!existe)
            return res.status(404).json({message: "Cliente não esta cadastrado!"})

        const avisos = await buscaTodosLogInter(existe.codigo)

        if(avisos.length == 0)
            return res.status(422).json({message: 'Sem avisos de log na base de dados!'})
        else
            return res.status(200).json({avisos: avisos})
    }

    static async inserir(req, res) {
        const {cnpjcliente} = req.body 
        
        const existe = await buscaPorCnpj(cnpjcliente)

        if(!existe)
            return res.status(404).json({message: "Cliente não esta cadastrado!"})

        let centralObj = []
        centralObj.push(moment().format('YYYY-MM-DD HH:mm:ss'))

        const bodyKeys = Object.keys(req.body)

        for (let i = 0; i < bodyKeys.length - 1; i++) {            
            centralObj.push(req.body[bodyKeys[i]])            
        }

        centralObj.push(existe.codigo)

        inserirAvisoCentralInterLog(centralObj).then(() => {
            res.status(201).json({mensagem: 'Log da Intercomunicação inserido com sucesso.'})    
        }).catch((error) => {
            console.log('Erro ao inserir log da intercomunicação:', error)
            return res.status(500).json({ message: 'Erro ao inserir log da intercomunicação.' })
        })
    }
}