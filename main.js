document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const resultsSection = document.getElementById("results");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = searchInput.value.trim();
      if (value) {
        window.location.href = `?q=${encodeURIComponent(value)}`;
      }
    });
  }

  if (query) {
    searchInput.value = query;
    fetchResults(query);
  }

  function fetchResults(query) {
    fetch(`https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        resultsSection.innerHTML = "";
        if (!data.items || data.items.length === 0) {
          resultsSection.innerHTML = "<p>No results found.</p>";
          return;
        }
        data.items.forEach((item) => {
          const resultDiv = document.createElement("div");
          resultDiv.className = "result";

          const title = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3>`;
          const snippet = `<p>${item.snippet}</p>`;
          const thumb = item.pagemap?.cse_thumbnail?.[0]?.src
            ? `<img src="${item.pagemap.cse_thumbnail[0].src}" alt="thumbnail" class="result-thumb">`
            : "";

          resultDiv.innerHTML = `${thumb}<div class="result-text">${title}${snippet}</div>`;
          resultsSection.appendChild(resultDiv);
        });
      })
      .catch((err) => {
        resultsSection.innerHTML = `<p>Error fetching results: ${err.message}</p>`;
        console.error(err);
      });
  }
});
