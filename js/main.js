// Quando o conteúdo da página estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  cargarEquipo();         // Carrega os dados do arquivo JSON da equipe e os insere no HTML
  mostrarElements();      // Ativa a animação dos elementos visíveis na rolagem
  scrollNavbar();         // Aplica o efeito de scroll na barra de navegação

  // Menu mobile: alterna a visibilidade da navegação ao clicar no botão hambúrguer
  const menuToggle = document.getElementById("mobile-menu");
  const nav = document.querySelector("nav ul");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});

// Função assíncrona que carrega e exibe os dados da equipe a partir de um arquivo JSON
async function cargarEquipo() {
  try {
    const response = await fetch('data/equipo.json');   // Requisição para o arquivo JSON
    const data = await response.json();                 // Conversão da resposta em objeto JS
    const contenedor = document.getElementById('contenedor-equipo'); // Container onde os dados serão inseridos
    if (!contenedor) return; // Garante que o container existe antes de continuar

    // Cria e insere um card para cada membro da equipe
    data.equipo.forEach(miembro => {
      const div = document.createElement('div');
      div.classList.add('card-equipo');
      div.innerHTML = `
        <img src="${miembro.foto}" alt="${miembro.nombre}" width="300" height="300">
        <h3>${miembro.nombre}</h3>
        <p>${miembro.cargo}</p>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar el equipo:', error); // Mostra erro caso falhe ao carregar o JSON
  }
}

// Elemento do cabeçalho (header) usado para aplicar o efeito visual ao rolar a página
const header = document.getElementById("header");

// Adiciona ou remove uma classe no header quando o usuário rola a página
function scrollNavbar() {
  if (window.scrollY > 100) {
    header.classList.add("header-scroll"); // Aplica estilo fixo ou com sombra
  } else {
    header.classList.remove("header-scroll");
  }
}

// Seleciona os elementos que terão animação de aparição ao rolar a página
const elements = document.querySelectorAll(".quienes-somos, .nuestros-servicios, .nuestro-equipo");

// Função que mostra os elementos quando estão visíveis na tela (efeito scroll reveal)
function mostrarElements() {
  const altura = window.innerHeight * 0.6; // Define um ponto de ativação (60% da altura da janela)

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top; // Posição do elemento na tela

    // Se o elemento estiver acima da linha de ativação, adiciona a classe para mostrar
    if (elementTop < altura) {
      element.classList.add("show");
    } else {
      element.classList.remove("show"); // Remove se sair da área visível
    }
  });
}

// Usa um timeout para limitar a quantidade de vezes que as funções são chamadas ao rolar a página
let timeout;

// Evento de rolagem da página
window.addEventListener("scroll", () => {
  clearTimeout(timeout); // Limpa o timeout anterior

  // Aguarda 50ms para executar as funções, evitando chamadas excessivas
  timeout = setTimeout(() => {
    mostrarElements();   // Verifica e mostra os elementos com animação
    scrollNavbar();      // Aplica ou remove classe do header
  }, 50);
});
