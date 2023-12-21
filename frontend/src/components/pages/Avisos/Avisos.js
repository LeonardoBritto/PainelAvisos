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
   
    function getResultadoClassNameCard(res_inter, res_miner){
        if (res_inter.includes('Falha') || res_miner.includes('Falha'))
            return 'card card-error';
        else
            return 'card card-primary'
    }

    function getResultadoClassName(resultado){
        switch(true) {
            case resultado === 'OK' || resultado === 'Desativado' || resultado === 'Ok' || resultado === 'ok':
                return '';
            default:
                return 'status_falha'
        }
    }

    function getStatusAtu(ftp, local){
        if (ftp !== local)
            return 'Desatualizado'
        else
            return 'OK'
    }

    const formAvisos = avisos.map((aviso) => ({
        ...aviso,
        data_atualizacao: format(new Date(aviso.data_atualizacao), 'dd/MM/yyyy HH:mm:ss')
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
                                                <div class={getResultadoClassNameCard(aviso.status_inter, aviso.status_miner)}>                                            
                                                    <div class="card-header">
                                                        <h4 style={{textAlign: 'center'}}>{aviso.nome}</h4>                                            
                                                    </div>                                           
                                                    <div class="card-body">
                                                        <a style={{color: 'black', fontSize: 14}} href={`interlog/${aviso.cnpj}`}>Log</a>
                                                        <h5 style={{color: '#f39c12'}}>Intercomunicação</h5><br/>
                                                        CNPJ: <b>{aviso.cnpj}</b> <br/>
                                                        Data: <b>{aviso.data_atualizacao}</b> <br/>
                                                        Atualização: FTP: <b>{aviso.versaoftp}</b> Local: <b>{aviso.versaolocal}</b> Status: <b>{getStatusAtu(aviso.versaoftp,aviso.versaolocal)}</b><br/> <br/>
                                                        ServiceGuardian.exe <b>Versão: {aviso.serviceguardian} </b> <br/>
                                                        Central.exe <b>Versão: {aviso.central} </b> <br/>
                                                        CentralService.exe <b>Versão: {aviso.centralservices} </b> <br/>
                                                        Mineradora.exe <b>Versão: {aviso.mineradora} </b> <br/>
                                                        CentralMineradora.exe <b>Versão: {aviso.centralmineradora} </b> <br/>
                                                        CentralAutomatizado.exe <b>Versão: {aviso.centralautomatizado} </b> <br/>
                                                        CentralManutencao.exe <b>Versão: {aviso.centralmanutencao} </b><br/> <br/>
                                                        SAJ - Lista Intimações aguardando ciência  <b className={getResultadoClassName(aviso.sollistaintaguardciencia)}>Status: {aviso.sollistaintaguardciencia}</b><br/>
                                                        SAJ - Lista Intimações com prazo iniciado <b className={getResultadoClassName(aviso.sollistaintimacaoautoconfirmada)}>Status: {aviso.sollistaintimacaoautoconfirmada}</b><br/>
                                                        SAJ - Lista Intimações Recebidas Portal <b className={getResultadoClassName(aviso.sollistaintimacoesrecebidas)}>Status: {aviso.sollistaintimacoesrecebidas}</b><br/>
                                                        SAJ - Intimações tomar ciência <b className={getResultadoClassName(aviso.solintimacaoaguardcienciaato)}>Status: {aviso.solintimacaoaguardcienciaato}</b><br/>
                                                        SAJ - Intimações obter teor (Auto conf.) <b className={getResultadoClassName(aviso.solintimacaoaguardteor)}>Status: {aviso.solintimacaoaguardteor}</b><br/>
                                                        SAJ - Intimações Leitura (Auto conf.) <b className={getResultadoClassName(aviso.confleituraintimacaoautoconf)}>Status: {aviso.confleituraintimacaoautoconf}</b><br/>
                                                        SAJ - Lista Citações aguardando ciência <b className={getResultadoClassName(aviso.sollistacitacoesaguardciencia)}>Status: {aviso.sollistacitacoesaguardciencia}</b><br/>
                                                        SAJ - Lista Citações com prazo iniciado <b className={getResultadoClassName(aviso.sollistacitacoesautoconfirmada)}>Status: {aviso.sollistacitacoesautoconfirmada}</b><br/>
                                                        SAJ - Lista Citações Recebidas Portal <b className={getResultadoClassName(aviso.sollistacitacoesrecebidas)}>Status: {aviso.sollistacitacoesrecebidas}</b><br/>
                                                        SAJ - Citações tomar ciência <b className={getResultadoClassName(aviso.solcitacaoaguardcienciaato)}>Status: {aviso.solcitacaoaguardcienciaato}</b><br/>
                                                        SAJ - Citações obter teor (Auto conf.) <b className={getResultadoClassName(aviso.solcitacaoaguardteor)}>Status: {aviso.solcitacaoaguardteor}</b><br/>
                                                        SAJ - Citações Leitura (Auto conf.) <b className={getResultadoClassName(aviso.confleituracitacaoautoconf)}>Status: {aviso.confleituracitacaoautoconf}</b><br/> <br/>
                                                        Pje - Lista de Avisos Pendentes <b className={getResultadoClassName(aviso.consultaravisospendentespje)}>Status: {aviso.consultaravisospendentespje}</b> <br/>
                                                        Pje - Intimações tomar ciência <b className={getResultadoClassName(aviso.solintimacaoaguardcienciaatopje)}>Status: {aviso.solintimacaoaguardcienciaatopje}</b> <br/>
                                                        Pje - Intimações obter teor (Auto conf.) <b className={getResultadoClassName(aviso.solintimacaoaguardteorpje)}>Status: {aviso.solintimacaoaguardteorpje}</b> <br/>
                                                        Pje - Citações tomar ciência <b className={getResultadoClassName(aviso.solcitacaoaguardcienciaatopje)}>Status: {aviso.solcitacaoaguardcienciaatopje}</b> <br/>
                                                        Pje - Citações obter teor (Auto conf.) <b className={getResultadoClassName(aviso.solcitacaoaguardteorpje)}>Status: {aviso.solcitacaoaguardteorpje}</b> <br/>
                                                        Pje - Outros Avisos tomar ciência <b className={getResultadoClassName(aviso.soloutroaguardcienciaatopje)}>Status: {aviso.soloutroaguardcienciaatopje}</b> <br/>
                                                        Pje - Outros Avisos obter teor (Auto conf.) <b className={getResultadoClassName(aviso.soloutroaguardteorpje)}>Status: {aviso.soloutroaguardteorpje}</b> <br/>
                                                        Pje - Captura de Processos <b className={getResultadoClassName(aviso.consultarprocessopje)}>Status: {aviso.consultarprocessopje}</b> <br/> <br/>
                                                        Horários de Execução da Central Intercomunicação:<br/> <b>[1]: {aviso.horaintercomunicacao1} - [2]:{aviso.horaintercomunicacao2} - 
                                                        [3]: {aviso.horaintercomunicacao3} - [4]: {aviso.horaintercomunicacao4}</b> <br/> 
                                                        Executou às: <b>{aviso.interhoraexecutou}</b><br/> 
                                                        CNPJ: <b>{aviso.cnpj}</b><br/>
                                                        Quantidade de Lotes em Aberto: <b>{aviso.qtdsolicitacoesaberto}</b><br/> <br/>
                                                        <hr/>
                                                        <a style={{color: 'black', fontSize: 14}} href={`minerlog/${aviso.cnpj}`}>Log</a>
                                                        <h5 style={{color: '#f39c12'}}>Mineração</h5><br/>
                                                        Data: <b>{aviso.data_atualizacao}</b> <br/> <br/>
                                                        Mineração das Intimações não localizadas:  <b className={getResultadoClassName(aviso.intimacoesnaoloc)}>Status: {aviso.intimacoesnaoloc}</b><br/>
                                                        Mineração das Citações não localizadas:  <b className={getResultadoClassName(aviso.citacoesnaoloc)}>Status: {aviso.citacoesnaoloc}</b><br/>
                                                        Mineração das Publicações não localizadas:  <b className={getResultadoClassName(aviso.publicacoesnaoloc)}>Status: {aviso.publicacoesnaoloc}</b><br/>
                                                        Mineração das Processos Monitorados:  <b className={getResultadoClassName(aviso.processosmonitorados)}>Status: {aviso.processosmonitorados}</b><br/>
                                                        Mineração das Processos Requisitórios:  <b className={getResultadoClassName(aviso.processosrequisitorios)}>Status: {aviso.processosrequisitorios}</b><br/><br/>
                                                        Quantidade de Lotes em Aberto: <b>{aviso.qtdlotesemaberto}</b>
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