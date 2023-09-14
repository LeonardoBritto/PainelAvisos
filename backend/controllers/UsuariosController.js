const {buscaTodosUsuarios, buscaUsuario, buscaUsuarioCodigo, inserirUsuario, alterarUsuario, excluirUsuario} = require('../db/ConexaoBanco')
const bcrypt = require('bcrypt')

const criarTokenUsuario = require('../helpers/criar-token-usuario')

module.exports = class UsuariosController {
    static async listar(req, res){
        const usuarios = await buscaTodosUsuarios()

        if(usuarios.length == 0)
            return res.status(422).json({message: 'Sem usuários na base de dados!'})
        else
            return res.status(200).json({usuarios: usuarios})
    }

    static async inserir(req, res){
        const {nome, login, senha, nivel} = req.body 

        if(!nome)
            return res.status(422).json({mensagem: "Nome obrigatório!"})

        if(!login)
            return res.status(422).json({mensagem: "Login obrigatório!"}) 

        const usuarioExiste = await buscaUsuario(login)

        if(usuarioExiste)
            return res.status(422).json({mensagem: "Usuario ja cadastrado!"}) 

        if(!senha)
            return res.status(422).json({mensagem: "Senha obrigatório!"})

        if(!nivel)
            return res.status(422).json({mensagem: "Nível obrigatório!"})        

        const salt = await bcrypt.genSalt(10)
        const senhaHash= await bcrypt.hash(senha, salt)

        const usuarioObj = {
            nome, 
            login, 
            senha: senhaHash, 
            nivel
        }

        inserirUsuario(usuarioObj).then(() => {
            res.status(201).json({mensagem: 'Usuario cadastrados com sucesso!'})
        }).catch((error) => {
            return res.status(500).json({ message: 'Erro ao cadastrar usuario!'})
        })
    }

    static async logar(req, res){
        const {login, senha} = req.body

        if(!login){
            res.status(422).json({mensagem: "Login obrigatório!"})
            return
        }

        const usuario = await buscaUsuario(login)

        if(!usuario){
            res.status(422).json({mensagem: "Usuário não cadastrado!"})
            return         
        }

        if(!senha){
            res.status(422).json({mensagem: "Senha obrigatória!"})
            return   
        }        

        const checaSenha = await bcrypt.compare(senha, usuario.senha)

        if(!checaSenha){
            res.status(422).json({mensagem: "Senha incorreta!"})
            return    
        }

        await criarTokenUsuario(usuario, req, res)
    }

    static async editar(req, res){
        const codigo = req.params.codigo 
        
        const usuario = await buscaUsuarioCodigo(codigo)

        if(!usuario){
            res.status(422).json({mensagem: "Usuário não cadastrado!"})
            return         
        }

        const {nome, login, senha, nivel} = req.body 

        if(!nome)
            return res.status(422).json({mensagem: "Nome obrigatório!"})

        if(!login)
            return res.status(422).json({mensagem: "Login obrigatório!"}) 

        const usuarioExiste = await buscaUsuario(login)

        if(usuarioExiste)
            return res.status(422).json({mensagem: "Usuario ja cadastrado!"}) 

        if(!senha)
            return res.status(422).json({mensagem: "Senha obrigatório!"})

        if(!nivel)
            return res.status(422).json({mensagem: "Nível obrigatório!"})        

        const salt = await bcrypt.genSalt(10)
        const senhaHash= await bcrypt.hash(senha, salt)

        const usuarioObj = {
            nome, 
            login, 
            senha: senhaHash, 
            nivel,
            codigo
        }

        alterarUsuario(usuarioObj).then(() => {
            res.status(201).json({mensagem: 'Usuario alterado com sucesso!'})
        }).catch((error) => {
            return res.status(500).json({ mensagem: 'Erro ao alterar usuario!'})
        })
    }

    static async excluir(req, res){
        const codigo = req.params.codigo 
        
        const usuario = await buscaUsuarioCodigo(codigo)

        if(!usuario){
            res.status(422).json({mensagem: "Usuário não cadastrado!"})
            return         
        }

        excluirUsuario(codigo).then(() => {
            res.status(201).json({mensagem: 'Usuario excluido com sucesso!'})
        }).catch((error) => {
            return res.status(500).json({ mensagem: 'Erro ao excluir usuario!' })
        })
    }
}