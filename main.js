document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const infoSec = document.getElementById("infoSection");
  const resultsSec = document.getElementById("resultsSection");
  const resultsDiv = document.getElementById("results");
  const dictDiv = document.getElementById("dictContent");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsMenu = document.getElementById("settingsMenu");
  const darkToggle = document.getElementById("darkToggle");

  // Load theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
    localStorage.setItem("theme", darkToggle.checked ? "dark" : "light");
  });

  // Settings dropdown toggle
  settingsBtn.addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
  });

  // On page load, check ?q=
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) {
    input.value = q;
    performSearch(q);
  }

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    history.pushState(null, "", `?q=${encodeURIComponent(query)}`);
    performSearch(query);
  });

  // Search + dictionary
  async function performSearch(query) {
    infoSec.classList.add("hidden");
    resultsSec.classList.remove("hidden");
    resultsDiv.innerHTML = "<p>Searching...</p>";
    dictDiv.textContent = "Loading definitions...";

    try {
      const res = await fetch(
        `https://bob.mylesjohn2012.workers.dev/?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      // Render results
      if (!data.items || !data.items.length) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      } else {
        resultsDiv.innerHTML = data.items
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
      resultsDiv.innerHTML = "<p>Error fetching results.</p>";
    }

    // Fetch dictionary
    try {
      const word = query.split(" ")[0];
      const r = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );
      const defs = await r.json();
      if (Array.isArray(defs)) {
        dictDiv.innerHTML = defs[0].meanings
          .map(
            (m) => `
            <strong>${m.partOfSpeech}</strong>
            <ul>${m.definitions
              .map((d) => `<li>${d.definition}</li>`)
              .join("")}</ul>`
          )
          .join("");
      } else {
        dictDiv.textContent = "No definitions found.";
      }
    } catch {
      dictDiv.textContent = "Error loading definitions.";
    }
  }
});
