import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

/*Pages*/
import Login from "./components/pages/Login"
import Avisos from "./components/pages/Avisos/Avisos"
import InterLog from "./components/pages/Avisos/InterLog"
import MinerLog from "./components/pages/Avisos/MinerLog"
import Clientes from "./components/pages/Clientes/Clientes"
import AlterarCliente from "./components/pages/Clientes/AlterarCliente"
import CadastrarCliente from "./components/pages/Clientes/CadCliente"
import Usuarios from "./components/pages/Usuarios/Usuarios"
import AlterarUsuario from "./components/pages/Usuarios/AlterarUsuario"
import CadastrarUsuario from "./components/pages/Usuarios/CadUsuario"

/*Context*/
import {UsuarioProvider} from "./context/UsuarioContext"

function App() {
  return (
    <Router>
      <UsuarioProvider>
        <Routes>        
          <Route path="/" element={<Login/>}/>
          <Route path="/avisos" element={<Avisos/>}/>
          <Route path="/interlog/:cnpj" element={<InterLog/>}/>
          <Route path="/minerlog/:cnpj" element={<MinerLog/>}/>  
          <Route path="/clientes" element={<Clientes/>}/>
          <Route path="/alterarcliente/:cnpj" element={<AlterarCliente/>}/>
          <Route path="/cadcliente" element={<CadastrarCliente/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/alterarusuario/:codigo" element={<AlterarUsuario/>}/>
          <Route path="/cadusuario" element={<CadastrarUsuario/>}/>                
        </Routes>
      </UsuarioProvider>   
    </Router>
  );
}

export default App;