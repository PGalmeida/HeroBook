import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hero from './pages/Hero';
import Favoritos from './pages/Favoritos';

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/heroi/:id" element={<Hero />} />
      <Route path="/favoritos" element={<Favoritos />} />
    </Routes>
  );
}

export default Rotas;