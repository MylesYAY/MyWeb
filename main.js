const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const darkToggle = document.getElementById("darkToggle");
const closeSettings = document.getElementById("closeSettings");

// Handle search
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;

  resultsContainer.innerHTML = "<p>Loading results...</p>";

  try {
    const res = await fetch("https://bob.mylesjohn2012.workers.dev/?q=" + encodeURIComponent(query));
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = data.items.map(item => `
      <div class="result">
        <a href="${item.link}" target="_blank"><h3>${item.title}</h3></a>
        <p>${item.snippet}</p>
        <small>${item.link}</small>
      </div>
    `).join("");
  } catch (err) {
    resultsContainer.innerHTML = "<p>Error fetching results.</p>";
  }
});

// Settings modal
settingsBtn.onclick = () => settingsModal.style.display = "block";
closeSettings.onclick = () => settingsModal.style.display = "none";

// Dark mode toggle
darkToggle.onchange = () => {
  document.body.classList.toggle("dark", darkToggle.checked);
  localStorage.setItem("theme", darkToggle.checked ? "dark" : "light");
};

// Load theme on startup
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }
});
