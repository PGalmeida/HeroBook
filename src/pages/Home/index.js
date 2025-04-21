import './home.css';
import { useEffect, useState } from 'react';
import { buscarHerois } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [herois, setHerois] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pesquisa.length >= 3) {
      buscarHerois(pesquisa).then(setHerois).catch(() => setHerois([]));
    }
  }, [pesquisa]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Digite o nome do herói..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <div className="grid">
        {herois?.map((heroi) => (
          <div className="card" key={heroi.id} onClick={() => navigate(`/filme/${heroi.id}`)}>
            <img src={heroi.image.url} alt={heroi.name} width="100" />
            <h3>{heroi.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;