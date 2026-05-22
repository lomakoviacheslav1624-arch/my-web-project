console.log("JS connected!");

const projects = [
  { id: 1, title: "Сайт-візитка", tech: "HTML/CSS" },
  { id: 2, title: "Todo App", tech: "JavaScript" },
  { id: 3, title: "Портфоліо", tech: "HTML/CSS/JS" }
];

console.log(projects[0]);
console.log(projects[0].title);

const container = document.querySelector('#projects-container');
const searchInput = document.querySelector('#search-input');
const themeBtn = document.querySelector('#theme-toggle');
const bodyElement = document.body;
const openBtn = document.querySelector('#open-modal');
const closeBtn = document.querySelector('#close-modal');
const modal = document.querySelector('#modal');
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#user-name');

function createProjectCard(project) {
  return `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.tech}</p>
    </div>
  `;
}

function renderProjects(list) {
  if (!container) return;

  const html = list
    .map(project => createProjectCard(project))
    .join('');

  container.innerHTML = html;
}

renderProjects(projects);

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(value)
    );

    renderProjects(filtered);
  });
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-theme');
  });
}

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (form && nameInput) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (nameInput.value.trim().length < 2) {
      alert("Ім'я має містити щонайменше 2 символи");
    } else {
      alert("Форму відправлено!");
      form.reset();
    }
  });
}
