import './home.css';
import { useEffect, useState } from 'react';
import { buscarHerois } from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [pesquisa, setPesquisa] = useState('');
  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (pesquisa.length >= 3) {
      setCarregando(true);
      setErro(null); 
      buscarHerois(pesquisa)
        .then((dados) => {
          setHerois(dados);
        })
        .catch(() => {
          setHerois([]);
          setErro('Erro ao buscar heróis');
        })
        .finally(() => {
          setCarregando(false);
        });
    } else {
      setHerois([]);
    }
  }, [pesquisa]);

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Digite o nome do herói..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className="search-input"
      />
      {carregando && <p className="loading">Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}
      <div className="grid">
        {herois.length === 0 && !carregando && !erro && pesquisa.length >= 3 && (
          <p className="no-results">Nenhum herói encontrado.</p>
        )}
        {herois.map((heroi) => (
          <div
            className="card"
            key={heroi.id}
            onClick={() => navigate(`/hero/${heroi.id}`)}
          >
            <img src={heroi.image.url} alt={heroi.name} width="100" />
            <h3>{heroi.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
