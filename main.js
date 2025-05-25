const WORKER_URL = "https://bob.mylesjohn2012.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
  const query = new URLSearchParams(window.location.search).get("q");
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");
  const searchForm = document.getElementById("search-form");

  if (searchInput && query) {
    searchInput.value = query;
    fetchResults(query);
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newQuery = searchInput.value.trim();
    if (newQuery) {
      window.location.href = `?q=${encodeURIComponent(newQuery)}`;
    }
  });

  function fetchResults(query) {
    resultsContainer.innerHTML = `<p>Searching for "${query}"...</p>`;

    fetch(`${WORKER_URL}/?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          const resultHTML = data.items.map(item => `
            <div class="result">
              <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
              <p>${item.snippet}</p>
              <small>${item.displayLink}</small>
            </div>
          `).join("");
          resultsContainer.innerHTML = resultHTML;
        } else {
          resultsContainer.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch(error => {
        resultsContainer.innerHTML = "<p>Failed to fetch results. Please try again later.</p>";
        console.error(error);
      });
  }
});
