import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

/*Pages*/
import Login from "./components/pages/Login"
import Avisos from "./components/pages/Avisos/Avisos"
import Clientes from "./components/pages/Clientes/Clientes"
import AlterarCliente from "./components/pages/Clientes/AlterarCliente"
import Usuarios from "./components/pages/Usuarios/Usuarios"

/*Context*/
import {UsuarioProvider} from "./context/UsuarioContext"

function App() {
  return (
    <Router>
      <UsuarioProvider>
        <Routes>        
          <Route path="/" element={<Login/>}/>
          <Route path="/avisos" element={<Avisos/>}/> 
          <Route path="/clientes" element={<Clientes/>}/>
          <Route path="/alterarcliente/:cnpj" element={<AlterarCliente/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>               
        </Routes>
      </UsuarioProvider>   
    </Router>
  );
}

export default App;