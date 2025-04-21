
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import RegistrarsePage from './Pages/Registrarse';
import LoginPage from './Pages/Login';
import RecuperarDatosUsuario from './Components/RecuperarDatosUsuario';
import Footbar from './Components/Footbar';
import CreaProducto from './Pages/CreaProducto/CreaProducto';
import './App.css';
import { AppProvider } from './Context';


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
            {/* rutas admin */}
            <Route path='/creaProd' element={<CreaProducto/>} />
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
