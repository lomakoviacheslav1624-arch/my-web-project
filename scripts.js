let allPosts = [];

const loading = document.querySelector('#loading');
const postsContainer = document.querySelector('#posts-container');
const searchInput = document.querySelector('#search-input');

function renderPosts(list) {
  if (!postsContainer) return;

  const html = list
    .map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `)
    .join('');

  postsContainer.innerHTML = html;
}

async function loadPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error('Помилка сервера');
    }

    const data = await response.json();

    allPosts = data.slice(0, 10);

    renderPosts(allPosts);

    if (loading) loading.style.display = 'none';

  } catch (error) {
    console.error(error);
    if (loading) loading.textContent = 'Помилка завантаження';
  }
}

loadPosts();

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(value)
    );

    renderPosts(filtered);
  });
}
