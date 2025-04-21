// src/pages/Hero/index.js
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './hero.css';

function Hero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heroi, setHeroi] = useState(null);

  useEffect(() => {
    async function loadHeroi() {
      const response = await fetch(`https://superheroapi.com/api.php/1347897bfc65af5ef04c85933c7557d7/${id}`);
      const data = await response.json();
      setHeroi(data);
    }
    loadHeroi();
  }, [id]);

  function salvarFavorito() {
    const favoritosSalvos = JSON.parse(localStorage.getItem('@herofinder')) || [];
    const hasHeroi = favoritosSalvos.some(item => item.id === heroi.id);

    if (!hasHeroi) {
      favoritosSalvos.push(heroi);
      localStorage.setItem('@herofinder', JSON.stringify(favoritosSalvos));
      alert('Herói salvo com sucesso!');
    } else {
      alert('Este herói já está nos favoritos.');
    }
  }

  if (!heroi) {
    return <div className="hero-container"><p>Carregando...</p></div>;
  }

  return (
    <div className="hero-container">
      <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
      <h1>{heroi.name}</h1>
      <img src={heroi.image.url} alt={heroi.name} />
      <div className="infos">
        <h3>Biografia:</h3>
        <p><strong>Nome completo:</strong> {heroi.biography['full-name']}</p>
        <p><strong>Editora:</strong> {heroi.biography.publisher}</p>
        <p><strong>Alinhamento:</strong> {heroi.biography.alignment}</p>
      </div>
      <button className="favoritar" onClick={salvarFavorito}>Salvar como favorito ⭐</button>
    </div>
  );
}

export default Hero;