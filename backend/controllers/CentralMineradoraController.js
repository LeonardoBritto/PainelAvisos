const moment = require('moment')
const {buscaTodosAvisosMineradora, buscaAvisoMineradora, buscaPorCnpj, alterarAvisosCentralMineradora, inserirAvisosCentralMineradora} = require('../db/ConexaoBanco')
const geraLog = require('../helpers/gerar-log')

module.exports = class CentralMineradoraController {
    static async listar(req, res){
        const avisos = await buscaTodosAvisosMineradora()

        if(avisos.length == 0)
            return res.status(422).json({message: 'Sem avisos na base de dados!'})
        else
            return res.status(200).json({mineradora: avisos})
    }

    static async inserir(req, res){
        const {cnpjcliente} = req.body 
        const tamanhoDosDados = req.get('Content-Length')
        console.log(req.body)
        const existe = await buscaPorCnpj(cnpjcliente)

        if(!existe)
            return res.status(404).json({message: "Cliente não esta cadastrado!"})

        geraLog(`Central Mineradora - ${existe.nome} - ${tamanhoDosDados} bytes`)

        let centralObj = []
        centralObj.push(moment().format('YYYY-MM-DD HH:mm:ss'))

        const bodyKeys = Object.keys(req.body)

        for (let i = 0; i < bodyKeys.length - 1; i++) {            
            centralObj.push(req.body[bodyKeys[i]])            
        }

        centralObj.push(existe.codigo)

        const avisoExist = await buscaAvisoMineradora(existe.codigo)

        if(avisoExist) {
            alterarAvisosCentralMineradora(centralObj).then(() => {
                res.status(201).json({mensagem: 'Avisos de mineradora alterados com sucesso.'})
            }).catch((error) => {
                console.log('Erro ao cadastrar avisos mineradora:', error)
                return res.status(500).json({ message: 'Erro ao alterar avisos mineradora.' })
            })
        } else {
            inserirAvisosCentralMineradora(centralObj).then(() => {
                res.status(201).json({mensagem: 'Avisos de mineradora cadastrados com sucesso.'})
            }).catch((error) => {
                console.log('Erro ao cadastrar avisos mineradora:', error)
                return res.status(500).json({ message: 'Erro ao cadastrar avisos mineradora.' })
            })
        }        
    }
}