document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const infoSection = document.getElementById("infoSection");
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("results");
  const dictContent = document.getElementById("dictContent");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsMenu = document.getElementById("settingsMenu");
  const darkToggle = document.getElementById("darkToggle");

  // Toggle settings dropdown
  settingsBtn.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
  });

  // Dark mode toggle
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
    localStorage.setItem("theme", darkToggle.checked ? "dark" : "light");
  });

  // Handle search submissions
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    // Show results area
    infoSection.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    resultsContainer.innerHTML = "<p>Searching...</p>";
    dictContent.textContent = "Loading definitions...";

    try {
      // Fetch search results from your Cloudflare Worker
      const res = await fetch(
        `https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      // Render results
      if (!data.items || data.items.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
      } else {
        resultsContainer.innerHTML = data.items
          .map(
            (item) => `
          <div class="result">
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
          </div>`
          )
          .join("");
      }
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML =
        "<p>Error fetching results. Please try again.</p>";
    }

    // Fetch dictionary for the first word
    const word = query.split(" ")[0];
    try {
      const r = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          word
        )}`
      );
      const defs = await r.json();
      if (Array.isArray(defs)) {
        dictContent.innerHTML = defs[0].meanings
          .map(
            (m) => `
            <strong>${m.partOfSpeech}</strong>
            <ul>
              ${m.definitions
                .map((d) => `<li>${d.definition}</li>`)
                .join("")}
            </ul>`
          )
          .join("");
      } else {
        dictContent.textContent = "No definitions found.";
      }
    } catch {
      dictContent.textContent = "Error loading definitions.";
    }
  });
});
