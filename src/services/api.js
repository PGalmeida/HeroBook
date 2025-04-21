const API_KEY = "1347897bfc65af5ef04c85933c7557d7";
const BASE_URL = `https://superheroapi.com/api.php/${API_KEY}`;

export async function buscarHerois(nome) {
  const resposta = await fetch(`${BASE_URL}/search/${nome}`);
  const dados = await resposta.json();
  return dados.results || [];
}

export async function buscarHeroiPorId(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`);
  const dados = await resposta.json();
  return dados;
}