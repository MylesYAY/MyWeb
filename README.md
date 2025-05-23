# MyWeb Search

MyWeb Search is a lightweight, modern web search interface powered by a Cloudflare Worker backend that uses the Google Custom Search JSON API. It aims to provide a clean and responsive search experience inspired by Google’s design, with added customization and enhanced usability.

---

## Features

- Clean and minimalistic search page styled with an orange accent and rounded corners.
- Responsive design suitable for desktop and mobile devices.
- Search powered via a Cloudflare Worker proxy to the Google Custom Search API.
- Displays search results with thumbnails, titles, and snippets.
- Clicking results opens links in new tabs.
- Scrollable results area for easy browsing of multiple results.

---

## Getting Started

### Prerequisites

- A Google Custom Search API key and Search Engine ID (CX).
- A Cloudflare account to deploy the Worker proxy.
- Basic knowledge of HTML, CSS, and JavaScript for customization.

### Deployment

1. **Cloudflare Worker**  
   Deploy the Cloudflare Worker that acts as a proxy to Google’s Custom Search API. The worker handles requests from the frontend and forwards them securely to Google, keeping your API key hidden.

2. **Frontend**  
   Host the provided `index.html` file on any static web hosting service (GitHub Pages, Netlify, Vercel, etc.).

3. **Configure API Endpoint**  
   Update the API URL in the frontend script to point to your deployed Worker URL.

---

## Usage

1. Open the web page.
2. Enter a search query into the input box.
3. Press "Search" or hit Enter.
4. View results with clickable titles and thumbnails.

---

## Folder Structure

- `index.html` — The main frontend HTML file containing markup, styles, and scripts.

---

## Notes

- This project relies on Google Custom Search API and requires an active API key and configured Custom Search Engine.
- Ensure you respect Google’s API usage limits and billing policies.

---

## Future Improvements

- User account system integration.
- Dictionary sidebar feature.
- Dark mode toggle.
- Additional seasonal or thematic enhancements.

---

## License

This project is open-source and free to use under the MIT License.

---

```bash
git clone https://github.com/mylesevans/myweb.git
