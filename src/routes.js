import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Favoritos from './pages/Favoritos';
import Error from './pages/Error';

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero/:id" element={<Hero />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="*" element={ <Error />} />
    </Routes>
  );
}

export default Rotas;