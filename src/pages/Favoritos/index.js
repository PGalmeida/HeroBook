// import './favoritos.css';

// function Favoritos() {
//   return <p>Funcionalidade de favoritos ainda não implementada.</p>;
// }

// export default Favoritos;

// src/pages/Favoritos/index.js
import { useEffect, useState } from 'react';
import './favoritos.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const lista = localStorage.getItem('@herofinder');
    setFavoritos(JSON.parse(lista) || []);
  }, []);

  function remover(id) {
    const novaLista = favoritos.filter(item => item.id !== id);
    setFavoritos(novaLista);
    localStorage.setItem('@herofinder', JSON.stringify(novaLista));
  }

  return (
    <div className="favoritos-container">
      <h1>Meus Heróis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="vazio">Você ainda não salvou nenhum herói 😢</p>
      ) : (
        <ul className="favoritos-lista">
          {favoritos.map(heroi => (
            <li key={heroi.id} className="favorito-item">
              <img src={heroi.image.url} alt={heroi.name} width={80} />
              <span>{heroi.name}</span>
              <button onClick={() => remover(heroi.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;