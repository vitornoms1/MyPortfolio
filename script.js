// 1. Dados dos projetos
const projectsData = {
  "AnimeDex": {
    title: "AnimeDex",
    description: "A feature-rich discovery platform for anime enthusiasts, powered by the Jikan API. Users can dynamically search, filter by genre, and sort titles across multiple pages. The application includes a detailed modal view with character data and utilizes URL-based state management, making user sessions shareable and refresh-proof.",
    githubUrl: "https://vitornoms1.github.io/animedex-project/"
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