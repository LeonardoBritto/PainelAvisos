import Navbar from "../../layout/Navbar"
import api from "../../../utils/api"
import './adminlte.css'

import { useState, useEffect} from "react"
import { format } from 'date-fns'

function Avisos () {
    const [avisos, setAvisos] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    
    useEffect(() => {
        api.get('centralinter/', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setAvisos(response.data.avisos)
        })
    },[token])

    const formAvisos = avisos.map((aviso) => ({
        ...aviso,
        data_atu: format(new Date(aviso.data_atu), 'dd/MM/yyyy HH:mm:ss')
    }))

    return (        
        <div>
            <Navbar pagina='PAINEL DE AVISOS'/>             
            <div class="hold-transition">
                <div class="wrapper">
                    <section class="content-header">
                        <section class="content">
                            <div class="container-fluid">
                                <div class="row">
                                    {formAvisos.length > 0 && (
                                        formAvisos.map((aviso) => (
                                            <div class="col-md-4">
                                                <div class="card card-primary">                                            
                                                    <div class="card-header">
                                                        <h4 style={{textAlign: 'center'}}>{aviso.nome}</h4>                                            
                                                    </div>                                           
                                                    <div class="card-body">
                                                        <h5 style={{color: '#f39c12'}}>Intercomunicação</h5><br/>
                                                        Data: <b>{aviso.data_atu}</b> <br/>
                                                        Atualização: FTP: <b>{aviso.versaoftp}</b> Local: <b>{aviso.versaolocal}</b> <br/> <br/>
                                                        ServiceGuardian.exe <b>Versão: {aviso.serviceguardian} </b> <br/>
                                                        Central.exe <b>Versão: {aviso.central} </b> <br/>
                                                        CentralService.exe <b>Versão: {aviso.centralservice} </b> <br/>
                                                        Mineradora.exe <b>Versão: {aviso.mineradora} </b> <br/>
                                                        CentralMineradora.exe <b>Versão: {aviso.centralmineradora} </b> <br/>
                                                        CentralAutomatizado.exe <b>Versão: {aviso.centralautomatizado} </b> <br/>
                                                        CentralManutencao.exe <b>Versão: {aviso.centralmanutencao} </b><br/> <br/>
                                                        SAJ - Lista Intimações aguardando ciência  <b>Status: {aviso.sollistaintaguardciencia}</b><br/>
                                                        SAJ - Lista Intimações com prazo iniciado <b>Status: {aviso.sollistaintimacaoautoconfirmada}</b><br/>
                                                        SAJ - Lista Intimações Recebidas Portal <b>Status: {aviso.sollistaintimacoesrecebidas}</b><br/>
                                                        SAJ - Intimações tomar ciência <b>Status: {aviso.solintimacaoaguardcienciaato}</b><br/>
                                                        SAJ - Intimações obter teor (Auto conf.) <b>Status: {aviso.solintimacaoaguardteor}</b><br/>
                                                        SAJ - Intimações Leitura (Auto conf.) <b>Status: {aviso.confleituraintimacaoautoconf}</b><br/>
                                                        SAJ - Lista Citações aguardando ciência <b>Status: {aviso.sollistacitacoesaguardciencia}</b><br/>
                                                        SAJ - Lista Citações com prazo iniciado <b>Status: {aviso.sollistacitacoesautoconfirmada}</b><br/>
                                                        SAJ - Lista Citações Recebidas Portal <b>Status: {aviso.sollistacitacoesrecebidas}</b><br/>
                                                        SAJ - Citações tomar ciência <b>Status: {aviso.solcitacaoaguardcienciaato}</b><br/>
                                                        SAJ - Citações obter teor (Auto conf.) <b>Status: {aviso.solcitacaoaguardteor}</b><br/>
                                                        SAJ - Citações Leitura (Auto conf.) <b>Status: {aviso.confleituracitacaoautoconf}</b><br/> <br/>
                                                        Pje - Lista de Avisos Pendentes <b>Status: {aviso.consultaravisospendentespje}</b> <br/>
                                                        Pje - Intimações tomar ciência <b>Status: {aviso.solintimacaoaguardcienciaatopje}</b> <br/>
                                                        Pje - Intimações obter teor (Auto conf.) <b>Status: {aviso.solintimacaoaguardteorpje}</b> <br/>
                                                        Pje - Citações tomar ciência <b>Status: {aviso.solcitacaoaguardcienciaatopje}</b> <br/>
                                                        Pje - Citações obter teor (Auto conf.) <b>Status: {aviso.solcitacaoaguardteorpje}</b> <br/>
                                                        Pje - Outros Avisos tomar ciência <b>Status: {aviso.soloutroaguardcienciaatopje}</b> <br/>
                                                        Pje - Outros Avisos obter teor (Auto conf.) <b>Status: {aviso.soloutroaguardteorpje}</b> <br/>
                                                        Pje - Captura de Processos <b>Status: {aviso.consultarprocessopje}</b> <br/> <br/>
                                                        Horários de Execução da Central Intercomunicação:<br/> <b>[1]: {aviso.horaintercomunicacao1} - [2]:{aviso.horaintercomunicacao2} - 
                                                        [3]: {aviso.horaintercomunicacao3} - [4]: {aviso.horaintercomunicacao4}</b> <br/> <br/>
                                                        Quantidade de Lotes em Aberto: <b>{aviso.qtdsolicitacoesaberto}</b><br/> <br/>
                                                        <hr/>
                                                        <h5 style={{color: '#f39c12'}}>Mineração</h5><br/>
                                                    </div>                                             
                                                </div>                                      
                                            </div>
                                        ))
                                    )}
                                    
                                </div>    
                            </div>                            
                        </section>
                    </section>
                </div>
            </div>                     
        </div>
    )
}

export default Avisos