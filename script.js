(function(){
  const slidesWrap = document.querySelector('.slides');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const slideCount = slides.length;

  if (slideCount === 0) return;

  // Clona o primeiro slide e adiciona ao final para permitir loop suave
  const firstClone = slides[0].cloneNode(true);
  slidesWrap.appendChild(firstClone);

  let index = 0; // índice lógico do slide atual (0..slideCount-1)
  const pauseTime = 3500;     // tempo parado em cada slide (ms)
  const transitionTime = 600; // deve combinar com transition em CSS (ms)

  // move para o índice atual (usa % para evitar overflow)
  function moveTo(i) {
    slidesWrap.style.transform = `translateX(-${i * 100}%)`;
  }

  // começa autoplay
  let autoplayTimer = null;

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      index++;
      moveTo(index);
    }, pauseTime + transitionTime); // espera pausa + tempo do deslize
  }

  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }

  // Ao terminar a transição, se estivermos no clone (index === slideCount),
  // "teleportamos" de volta para o primeiro slide instantaneamente (sem transição).
  slidesWrap.addEventListener('transitionend', () => {
    if (index === slideCount) {
      // desliga transição, volta para 0, força reflow, reativa transição
      slidesWrap.style.transition = 'none';
      index = 0;
      moveTo(index);
      // força reflow para aplicar a mudança sem transição
      // (acessar offsetHeight força o navegador a aplicar o estilo)
      slidesWrap.offsetHeight;
      slidesWrap.style.transition = `transform ${transitionTime}ms ease`;
    }
  });

  // inicia em 0 e começa autoplay
  moveTo(0);
  startAutoplay();

  // opcional: pausa ao passar o mouse (bom para desktop)
  const carouselEl = document.getElementById('carousel');
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);

  // se quiser controlar por toque (swipe) em mobile, eu adiciono depois.

})();

function verificarCEP() {
    const cep = document.getElementById("cepInput").value;

    if (cep === "") {
        alert("Digite um CEP.");
        return;
    }

    // CEPs que têm loja (exemplo)
    const cepsComLoja = ["01001-000", "04094-050", "50010-000", "60015-160"];

    if (cepsComLoja.includes(cep)) {
        alert("✔ Existe uma loja próxima ao seu CEP!");
    } else {
        alert("❌ Não encontramos loja nesse CEP.");
    }
}

const produtos = [
    {
        nome: "Tablete Dreams Mil-Folhas 130g",
        img: "resources/chocolate (3).webp",
        link: "dreams.html"
    },
    {
        nome: "Tablete Dreams Mil-Folhas Avelã 130g",
        img: "resources/chocolate (2).webp",
        link: "dreamsavelã.html"
    },
    {
        nome: "Tablete LaNut Gianduia 100g",
        img: "resources/chocolate (1).webp",
        link: "lanut.html"
    },

    {
        nome: "Tablete LaCreme ao Leite 100g",
        img: "resources/chocolate (4).webp",
        link: "lanut.html"
    },
    
    {
        nome: "Panetone LaCreme ao Leite 650g",
        img: "resources/lacreme.png",
        link: "lacreme.html"
    },

    {
        nome: "Panetone Gotas ao Leite 450g",
        img: "resources/gotas.png",
        link: "lacreme.html"
    },

    {
        nome: "Panetone Recheio Brigadeiro 580g",
        img: "resources/brigadeiro.png",
        link: "lacreme.html"
    },

    {
        nome: "Panetone Trufado ao Leite 420g",
        img: "resources/trufado.png",
        link: "lacreme.html"
    },

    {
        nome: "Caixa Bombons Gourmet Sortidos",
        img: "resources/presentes (1).webp",
        link: "lacreme.html"
    },

    {
        nome: "Cesta Chocomonstros do Monstrinho Adamastor",
        img: "resources/presentes (2).webp",
        link: "lacreme.html"
    },

    {
        nome: "Caneca Vermelha de Natal de 300ml",
        img: "resources/presentes (3).webp",
        link: "lacreme.html"
    },

    {
        nome: "Caneca Verde de Natal de 300ml",
        img: "resources/presentes (4).webp",
        link: "lacreme.html"
    },

    {
        nome: "Wafer Biscoiteria Mil-Folhas",
        img: "resources/biscoito (1).webp",
        link: "lacreme.html"
    },

    {
        nome: "Wafer Biscoiteria Limão Siciliano",
        img: "resources/biscoito (2).webp",
        link: "lacreme.html"
    },

    {
        nome: "Wafer Biscoiteria Cappuccino",
        img: "resources/biscoito (3).webp",
        link: "lacreme.html"
    },

    {
        nome: "Wafer Biscoiteria Pistache",
        img: "resources/biscoito (4).webp",
        link: "lacreme.html"
    },
    
    {
        nome: "Copo Viagem Calda Cacau Show",
        img: "resources/garrafa (1).webp",
        link: "lacreme.html"
    },

    {
        nome: "Garrafa Termica Marrom Cacau Show",
        img: "resources/garrafa (2).webp",
        link: "lacreme.html"
    },

    {
        nome: "Garrafa Termica Bege Cacau Show",
        img: "resources/garrafa (3).webp",
        link: "lacreme.html"
    },

    {
        nome: "Garrafa Termica Verde Cacau Show",
        img: "resources/garrafa (4).webp",
        link: "lacreme.html"
    },
    
];


const searchBar = document.getElementById("searchBar");
const resultsBox = document.getElementById("searchResults");

searchBar.addEventListener("input", () => {
    const texto = searchBar.value.toLowerCase();

    if (texto === "") {
        resultsBox.style.display = "none";
        return;
    }

    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(texto));

    resultsBox.innerHTML = "";

    filtrados.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("result-item");

        item.innerHTML = `
            <img src="${p.img}">
            <span>${p.nome}</span>
        `;

        item.addEventListener("click", () => {
            window.location.href = p.link;
        });

        resultsBox.appendChild(item);
    });

    resultsBox.style.display = filtrados.length > 0 ? "block" : "none";
});
