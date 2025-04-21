import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './hero.css';

function Hero() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [heroi, setHeroi] = useState(null);

  useEffect(() => {
    async function loadHeroi() {
      const baseUrl = 'https://superheroapi.com/api.php/1347897bfc65af5ef04c85933c7557d7';

      try {
        const [mainRes, powerstatsRes, bioRes, imgRes, appRes] = await Promise.all([
          fetch(`${baseUrl}/${id}`).then(res => res.json()),
          fetch(`${baseUrl}/${id}/powerstats`).then(res => res.json()),
          fetch(`${baseUrl}/${id}/biography`).then(res => res.json()),
          fetch(`${baseUrl}/${id}/image`).then(res => res.json()),
          fetch(`${baseUrl}/${id}/appearance`).then(res => res.json()),
        ]);

        setHeroi({
          id: mainRes.id,
          name: mainRes.name,
          image: imgRes.url,
          powerstats: powerstatsRes,
          biography: bioRes,
          appearance: appRes
        });
      } catch (error) {
        console.error('Erro ao carregar herói:', error);
      }
    }

    loadHeroi();
  }, [id]);

  function salvarFavorito() {
    const favoritosSalvos = JSON.parse(localStorage.getItem('@HeroBook')) || [];
    const hasHeroi = favoritosSalvos.some(item => item.id === heroi.id);

    if (!hasHeroi) {
      favoritosSalvos.push({
        id: heroi.id,
        name: heroi.name,
        image: heroi.image
      });
      localStorage.setItem('@HeroBook', JSON.stringify(favoritosSalvos));
      alert('Herói salvo com sucesso!');
    } else {
      alert('Este herói já está nos favoritos.');
    }
  }

  if (!heroi) {
    return <div className="hero-container"><p>Carregando herói...</p></div>;
  }

  return (
    <div className="hero-container">
      <h1>{heroi.name}</h1>
      <img src={heroi.image} alt={heroi.name} />

      <div className="buttons-container">
        <button className="voltar" onClick={() => navigate(-1)}>Voltar</button>
        <button className="favoritar" onClick={salvarFavorito}>Salvar como favorito</button>
      </div>
  
      <div className="infos">
        <h3>Powerstats</h3>
        <ul>
          <li><strong>Inteligência:</strong> {heroi.powerstats.intelligence}</li>
          <li><strong>Força:</strong> {heroi.powerstats.strength}</li>
          <li><strong>Velocidade:</strong> {heroi.powerstats.speed}</li>
          <li><strong>Durabilidade:</strong> {heroi.powerstats.durability}</li>
          <li><strong>Poder:</strong> {heroi.powerstats.power}</li>
          <li><strong>Combate:</strong> {heroi.powerstats.combat}</li>
        </ul>
  
        <h3>Biografia</h3>
        <p><strong>Nome completo:</strong> {heroi.biography['full-name']}</p>
        <p><strong>Alter Egos:</strong> {heroi.biography['alter-egos']}</p>
        <p><strong>Alias:</strong> {heroi.biography.aliases.join(', ')}</p>
        <p><strong>Local de nascimento:</strong> {heroi.biography['place-of-birth']}</p>
        <p><strong>Primeira aparição:</strong> {heroi.biography['first-appearance']}</p>
        <p><strong>Editora:</strong> {heroi.biography.publisher}</p>
        <p><strong>Alinhamento:</strong> {heroi.biography.alignment}</p>
      </div>
    </div>
  );
  
}

export default Hero;
