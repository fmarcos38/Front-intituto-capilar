
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './Context';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import RegistrarsePage from './Pages/Registrarse';
import LoginPage from './Pages/Login';
import RecuperarDatosUsuario from './Components/RecuperarDatosUsuario';
import Footbar from './Components/Footbar';
import CreaProducto from './Pages/CreaProducto/CreaProducto';
import ListaProdsAdminPage from './Pages/ListaProdsAdminPage';
import EditaProd from './Pages/EditaProd';
import './App.css';
import ModificaDatosUsuario from './Pages/ModificaDatosUsuario';



function App() {
  return (
    <AppProvider>
      <div className="App">
          <header className="App-header">
            <Navbar />
          </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/registrarse' element={<RegistrarsePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/recuperarDatosUsuario' element={<RecuperarDatosUsuario />} />
            <Route path='/modificarDatosUsuario' element={<ModificaDatosUsuario/>} />
            {/* rutas admin */}
            <Route path='/creaProd' element={<CreaProducto/>} />
            <Route path='/listarProds' element={<ListaProdsAdminPage/>} />
            <Route path='/editaProd/:_id' element={<EditaProd/>} />
            {/* si no existe ruta */}
            <Route path='*' element={<Home/>} />
          </Routes>
        </main>

          <footer>
              <Footbar />
          </footer>
      </div>
      </AppProvider>
  );
}

export default App;
