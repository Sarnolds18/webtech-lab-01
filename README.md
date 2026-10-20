# webtech-lab-01

**Santiago Arnolds Pérez**

Personal page for Web Technologies — Lab 1, Lab 2 and Lab 10.

Published site: https://sarnolds18.github.io/webtech-lab-01/

## Lab 2 — interactive features

- **Setup collection ("My setup"):** below Skills. Type in the "Search" field or click a category
  button (All / PC / Gym / Desk) to filter live; use the "Add item" form at the bottom of the
  section to add a new item, and click "See more" on any item to expand its detail.
- **Contact form validation:** in Contact, submit the form empty or with an invalid email to see
  inline error messages next to each field; fix a field and submit again to see them clear and get
  a confirmation message.
- **Theme toggle:** the "🌙 Dark mode" button in the header switches the whole page between light
  and dark theme.

## Lab 10 — the Wheelhouse price list

- **"Wheelhouse prices" section:** reads the price list of
  [Wheelhouse](https://github.com/Sarnolds18/webtech-wheelhouse), a bike repair shop's Rails app, from
  its JSON API (`GET /api/v1/services`) when the page loads, and builds the table in the browser. Prices
  are shown in Chilean pesos. While the answer is on its way the section says so; if the API is not
  running it says that instead, and if the API answers an error it shows the API's messages.
- **Look up one service:** type a service id and press "Look up" to see its name, price and how many
  repairs it was charged on (`GET /api/v1/services/:id`). An id that doesn't exist shows the API's
  "does not exist" message.
- **The API has to be running locally on port 3000** (the URL is the `API_URL` constant at the top of
  `script.js`); see the Wheelhouse README for how to start it. The API only accepts this page from
  `https://sarnolds18.github.io` and from `http://localhost:8000`, so while developing serve this folder
  with `python3 -m http.server 8000` (opening `index.html` from the file system won't work). Recent
  Chrome asks for permission before a public page talks to `localhost`: allow it, or use Firefox.
