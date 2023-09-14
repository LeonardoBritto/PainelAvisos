const {buscaPorCnpj, inserirCliente, buscaTodosClientes, editarClientes, excluirCliente, mudarEstado} = require('../db/ConexaoBanco')
const bcrypt = require('bcrypt')
const criarClienteTokenApi = require('../helpers/criar-token-cliente-api')
const geraLog = require('../helpers/gerar-log')

module.exports = class ClientesController {
    static async inserir(req, res) {
        const {cnpj, nome, usuario, senha, ipacesso} = req.body

        if(!cnpj)
            return res.status(422).json({mensagem: "CNPJ obrigatório!"})        

        if(!nome)
            return res.status(422).json({mensagem: "Nome obrigatório!"})        

        if(cnpj.length != 14)
            return res.status(422).json({mensagem: "CNPJ incorreto!"})

        const salt = await bcrypt.genSalt(10)
        const senhaHash= await bcrypt.hash(senha, salt)

        const cliente = {
            cnpj,
            nome, 
            usuario, 
            senha: senhaHash, 
            ipacesso,
            ativo: 1
        }
        
        buscaPorCnpj(cnpj).then((existe) => {
            if(existe)
                return res.status(409).json({mensagem: "Cliente ja esta cadastrado!"})            

            inserirCliente(cliente).then(() => {
                res.status(201).json({mensagem: 'Cliente cadastrado com sucesso.'})
            }).catch((error) => {
                console.log('Erro ao cadastrar cliente:', error)
                return res.status(500).json({ mensagem: 'Erro ao cadastrar cliente.' })  
            })

        }).catch((error) => {
            console.log('Erro ao cadastrar cliente:', error)
            return res.status(500).json({ mensagem: 'Erro ao cadastrar cliente.' })  
        })
    }
    
    static async autenticar(req, res) {
        const {cnpj, usuario, senha} = req.body
        
        if(!cnpj || !usuario || !senha){
            geraLoglog('Dados incompletos para autenticação!') 
            return res.status(422).json({mensagem: "Dados incompletos para autenticação!"})                       
        }

        const cliente = await buscaPorCnpj(cnpj);

        if(!cliente){
            geraLog('Cliente não consta na base de dados!') 
            return res.status(422).json({mensagem: "Cliente não consta na base de dados!"})
        }

        if(usuario != cliente.usuario){
            geraLog('Usuário incorreto!') 
            return res.status(422).json({mensagem: "Usuário incorreto!"})   
        }

        const checarSenha = await bcrypt.compare(senha, cliente.senha)

        if(!checarSenha){
            geraLog('Senha incorreta')
            return res.status(422).json({mensagem: "Senha incorreta!"})  
        }

        await criarClienteTokenApi(cliente, req, res)            
    }

    static async listar(req, res) {
        const clientes = await buscaTodosClientes()
        
        if(clientes.length == 0)
            return res.status(422).json({mensagem: 'Sem clientes na base de dados!'})
        else
            return res.status(200).json({clientes: clientes})
    }

    static async buscaCliente(req, res) {
        const cnpj = req.params.cnpj

        const cliente = await buscaPorCnpj(cnpj)

        if(!cliente)
            return res.status(422).json({mensagem: 'Cliente não encontrado!'})
        else
            return res.status(200).json({cliente: cliente})
    }

    static async editar(req, res){
        const oldcnpj = req.params.cnpj 
        
        const cliente = await buscaPorCnpj(oldcnpj)

        if(!cliente){
            res.status(422).json({mensagem: "Cliente não cadastrado!"})
            return         
        }

        const {cnpj, nome, usuario, senha, ipacesso} = req.body
        
        let clienteObj
        if(cliente.senha === senha || senha === undefined){  
            clienteObj = {
                cnpj,
                nome, 
                usuario, 
                senha: cliente.senha, 
                ipacesso
            }
        } else {
            const salt = await bcrypt.genSalt(10)
            const senhaHash= await bcrypt.hash(senha, salt)

            clienteObj = {
                cnpj,
                nome, 
                usuario, 
                senha: senhaHash, 
                ipacesso
            }    
        }      

        editarClientes(clienteObj, oldcnpj).then(() => {
            res.status(201).json({mensagem: 'Cliente alterado com sucesso!'})
        }).catch((error) => {
            return res.status(500).json({ mensagem: 'Erro ao alterar cliente!' })
        })
    }

    static async excluir(req, res){
        const cnpj = req.params.cnpj 
        
        const cliente = await buscaPorCnpj(cnpj)

        if(!cliente){
            res.status(422).json({mensagem: "Cliente não cadastrado!"})
            return         
        }

        excluirCliente(cnpj).then(() => {
            res.status(201).json({mensagem: 'Cliente excluido com sucesso!'})
        }).catch((error) => {
            return res.status(500).json({menssage: 'Erro ao excluir cliente!' })
        })
    }

    static async mudarEstado(req, res) {
        const cnpj = req.params.cnpj 
        
        const cliente = await buscaPorCnpj(cnpj)

        if(!cliente){
            res.status(422).json({mensagem: "Cliente não cadastrado!"})
            return         
        } 
        
        if(cliente.ativo === 1){
            mudarEstado(cnpj, 0).then(() => {
                res.status(201).json({mensagem: 'Cliente inativado com sucesso!'})
            }).catch((error) => {
                return res.status(500).json({menssage: 'Erro ao inativar cliente!' })
            })
        } else {
            mudarEstado(cnpj, 1).then(() => {
                res.status(201).json({mensagem: 'Cliente ativado com sucesso!'})
            }).catch((error) => {
                return res.status(500).json({menssage: 'Erro ao ativar cliente!' })
            })
        }
    }
}