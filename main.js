document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");
  const homeInfo = document.getElementById("homeInfo");
  const resultsSection = document.getElementById("resultsSection");
  const dictionaryBox = document.getElementById("dictionary");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsMenu = document.getElementById("settingsMenu");
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Parse ?q= from URL on load
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (query) {
    searchInput.value = query;
    performSearch(query);
  }

  // Search submit
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.history.pushState({}, "", `?q=${encodeURIComponent(query)}`);
      performSearch(query);
    }
  });

  // Perform the actual search
  async function performSearch(query) {
    homeInfo.style.display = "none";
    resultsSection.style.display = "flex";
    resultsContainer.innerHTML = "<p>Searching...</p>";

    try {
      const response = await fetch(`https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      resultsContainer.innerHTML = data.items.map(item => `
        <div class="result">
          <h3><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
          <p>${item.snippet}</p>
        </div>
      `).join("");

      // Optional: Show dictionary definitions
      showDefinitions(query);

    } catch (error) {
      console.error("Search error:", error);
      resultsContainer.innerHTML = "<p>Error loading search results.</p>";
    }
  }

  // Dictionary dummy example
  function showDefinitions(word) {
    dictionaryBox.innerHTML = `
      <h2>Definitions for "${word}"</h2>
      <ul>
        <li>This is just a placeholder.</li>
        <li>You can integrate a dictionary API here later.</li>
      </ul>
    `;
  }

  // Settings dropdown
  settingsBtn.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
  });

  // Dark mode toggle
  darkModeToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
    localStorage.setItem("theme", e.target.checked ? "dark" : "light");
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }
});
