// JavaScript for MyWeb search page

document.addEventListener('DOMContentLoaded', () => {
  const darkToggle = document.getElementById('darkToggle');
  if (localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark');
    darkToggle.textContent = '☀️';
  }

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('dark', isDark);
    darkToggle.textContent = isDark ? '☀️' : '🌙';
  });

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (query) {
    document.getElementById('searchInput').value = query;
    fetchResults(query);
  }
});

async function fetchResults(query) {
  const res = await fetch('https://bob.mylesjohn2012.workers.dev/?q=' + encodeURIComponent(query));
  const data = await res.json();
  const results = document.getElementById('results');
  results.innerHTML = '';

  (data.items || []).forEach(item => {
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${item.snippet}</p>
    `;
    results.appendChild(div);
  });
}
