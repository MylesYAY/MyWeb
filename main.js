const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultsDiv = document.getElementById("results");
const homepageInfo = document.getElementById("homepage-info");
const themeSelect = document.getElementById("theme-select");
const settingsBtn = document.getElementById("settings-btn");
const settingsMenu = document.getElementById("settings-menu");

// Toggle settings dropdown
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.toggle("hidden");
});

// Apply theme
themeSelect.addEventListener("change", () => {
  document.body.dataset.theme = themeSelect.value;
  localStorage.setItem("theme", themeSelect.value);
});

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;
  themeSelect.value = savedTheme;

  const query = new URLSearchParams(window.location.search).get("q");
  if (query) {
    searchInput.value = query;
    performSearch(query);
  }
});

// Search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    window.history.pushState({}, "", `?q=${encodeURIComponent(query)}`);
    performSearch(query);
  }
});

function performSearch(query) {
  resultsDiv.innerHTML = "<p>Loading...</p>";
  resultsDiv.classList.remove("hidden");
  homepageInfo.classList.add("hidden");

  fetch(`https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      if (!data.items || data.items.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      for (const item of data.items) {
        const div = document.createElement("div");
        div.className = "result";
        div.innerHTML = `
          <a href="${item.link}" target="_blank">
            <h3>${item.title}</h3>
            <p>${item.snippet}</p>
            <small>${item.link}</small>
          </a>
        `;
        resultsDiv.appendChild(div);
      }
    })
    .catch(err => {
      console.error(err);
      resultsDiv.innerHTML = "<p>Error fetching results.</p>";
    });
}
