import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import Headers from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Headers />
      <Rotas />
    </BrowserRouter>
  );
}

export default App;