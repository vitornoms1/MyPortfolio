// 1. Dados dos projetos
const projectsData = {
  "AnimeDex": {
    title: "AnimeDex",
    description: "A feature-rich discovery platform for anime enthusiasts, powered by the Jikan API. Users can dynamically search, filter by genre, and sort titles across multiple pages. The application includes a detailed modal view with character data and utilizes URL-based state management, making user sessions shareable and refresh-proof.",
    githubUrl: "https://vitornoms1.github.io/animedex-project/"
  },
  "The Golden Mug": {
    title: "The Golden Mug",
    description: "A complete front-end concept for a modern pub, built with TailwindCSS. This project features a dynamic menu with filtering, a fully functional shopping cart, user login/registration simulation using LocalStorage, and interactive modals. It's designed to showcase a clean UI and essential e-commerce functionalities.",
    githubUrl: "https://vitornoms1.github.io/PubsProject/"
  },
  "CryptoDash": {
    title: "CryptoDash",
    description: "A real-time cryptocurrency dashboard that fetches and displays data directly from the CoinGecko API. Features include dynamic and interactive charts with ApexCharts, a live search function, a top movers list, and a light/dark theme toggle. Built with vanilla JavaScript, HTML, and CSS.",
    githubUrl: "https://vitornoms1.github.io/Dashboard/" // <-- ATUALIZE ESTE LINK!
  }
  // "OutroProjeto": { ... }
};

const projectCards = document.querySelectorAll('.project-card');
const modalOverlay = document.getElementById('modal-overlay');
const projectModal = document.getElementById('project-modal');
const closeModalButton = document.querySelector('.close-button');

const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.dataset.projectKey;
    const projectInfo = projectsData[projectKey];

    if (projectInfo) {
      const imgSrc = card.querySelector('img').src;

      modalTitle.innerText = projectInfo.title;
      modalImg.src = imgSrc;
      modalDescription.innerText = projectInfo.description;
      modalLink.href = projectInfo.githubUrl;

      modalOverlay.classList.add('active');
      projectModal.classList.add('active');
      body.classList.add('no-scroll');
    } else {
      console.error(`Dados do projeto não encontrados para a chave: ${projectKey}`);
    }
  });
});

const closeModal = () => {
  modalOverlay.classList.remove('active');
  projectModal.classList.remove('active');
  body.classList.remove('no-scroll');
};

closeModalButton.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);