const moment = require('moment')
const {buscaTodosAvisos, buscaPorCnpj, inserirAvisoCentral, buscaAviso, atualizarAvisoCentral} = require('../db/ConexaoBanco')

module.exports = class CentralIntercomunicacaoController {
    static async listar(req, res) {
        const avisos = await buscaTodosAvisos()

        if(avisos.length == 0)
            return res.status(422).json({message: 'Sem avisos na base de dados!'})
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
        
        const avisoExist = await buscaAviso(existe.codigo)        

        if(avisoExist) {
            atualizarAvisoCentral(centralObj).then(() => {
                res.status(201).json({mensagem: 'Avisos de Intercomunicação atualizado com sucesso.'})    
            }).catch((error) => {
                console.log('Erro ao atualizar avisos intercomunicação:', error)
                return res.status(500).json({ message: 'Erro ao atualizar avisos intercomunicação.' })
            })
        } else {           
            inserirAvisoCentral(centralObj).then(() => {
                res.status(201).json({mensagem: 'Avisos de Intercomunicação cadastrados com sucesso.'})
            }).catch((error) => {
                console.log('Erro ao cadastrar avisos intercomunicação:', error)
                return res.status(500).json({ message: 'Erro ao cadastrar avisos intercomunicação.' })
            })
        }        
    }
}