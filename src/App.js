
import Navbar from './Components/Navbar';
import { AppProvider } from './Context';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import RegistrarsePage from './Pages/Registrarse';
import LoginPage from './Pages/Login';
import RecuperarDatosUsuario from './Components/RecuperarDatosUsuario';
import './App.css';

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
          </Routes>
        </main>

          <footer>
              foot
          </footer>
      </div>
      </AppProvider>
  );
}

export default App;
