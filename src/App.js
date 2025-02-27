
import Navbar from './Components/Navbar';
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
              main
          </main>

          <footer>
              foot
          </footer>
      </div>
      </AppProvider>
  );
}

export default App;
