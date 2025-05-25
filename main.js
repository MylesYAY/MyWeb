const searchForms = [document.getElementById('searchForm'), document.getElementById('homeSearchForm')];
const searchInputs = [document.getElementById('searchInput'), document.getElementById('homeSearchInput')];
const homeView = document.getElementById('homeView');
const resultsView = document.getElementById('resultsView');

function showResults(query) {
  homeView.classList.add('hidden');
  resultsView.classList.remove('hidden');
  document.getElementById('searchInput').value = query;
  loadResults(query);
  loadDict(query);
}

searchForms.forEach((form, i) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInputs[i].value.trim();
    if (q) showResults(q);
  });
});

function loadResults(q) {
  fetch(`https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(q)}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('results');
      container.innerHTML = '';
      (data.items || []).forEach(item => {
        const div = document.createElement('div');
        div.className = 'result';
        div.innerHTML = `
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <p>${item.snippet}</p>
        `;
        container.appendChild(div);
      });
    });
}

function loadDict(q) {
  const word = q.split(' ')[0];
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
    .then(res => res.json())
    .then(data => {
      const dict = document.getElementById('dictionary');
      dict.innerHTML = '<h2>Dictionary</h2>';
      if (!Array.isArray(data)) {
        dict.innerHTML += '<p>No definitions found.</p>';
        return;
      }
      data[0].meanings.forEach(m => {
        const section = document.createElement('div');
        section.innerHTML = `<strong>${m.partOfSpeech}</strong><ul>${m.definitions.map(def => `
          <li>${def.definition}${def.example ? `<br><em>"${def.example}"</em>` : ''}</li>
        `).join('')}</ul>`;
        dict.appendChild(section);
      });
    });
}

// Dark mode
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('dark') === 'true') document.body.classList.add('dark');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark', document.body.classList.contains('dark'));
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Wallpaper
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const wallpaperSelect = document.getElementById('wallpaperSelect');

settingsBtn.onclick = () => settingsModal.classList.add('show');
function closeSettings() { settingsModal.classList.remove('show'); }

wallpaperSelect.onchange = () => {
  const val = wallpaperSelect.value;
  document.body.style.backgroundImage = val ? `url(${val})` : '';
  localStorage.setItem('wallpaper', val);
};

const savedWallpaper = localStorage.getItem('wallpaper');
if (savedWallpaper) {
  wallpaperSelect.value = savedWallpaper;
  document.body.style.backgroundImage = `url(${savedWallpaper})`;
}
