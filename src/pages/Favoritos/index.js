import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './favoritos.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const lista = localStorage.getItem('@HeroBook');
    setFavoritos(JSON.parse(lista) || []);
  }, []);

  function remover(id) {
    const novaLista = favoritos.filter(item => item.id !== id);
    setFavoritos(novaLista);
    localStorage.setItem('@HeroBook', JSON.stringify(novaLista));
  }

  function navegarParaDetalhes(id) {
    navigate(`/hero/${id}`); 
  }

  return (
    <div className="favoritos-container">
      <h1>Meus Heróis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="vazio">Você ainda não salvou nenhum herói</p>
      ) : (
        <ul className="favoritos-lista">
          {favoritos.map(heroi => (
            <li key={heroi.id} className="favorito-item">
              <div className="favorito-card" onClick={() => navegarParaDetalhes(heroi.id)}>
                <h3 className="favorito-name">{heroi.name}</h3>
                <img src={heroi.image} alt={heroi.name} />
              </div>
              <button className="favorito-remover" onClick={() => remover(heroi.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;