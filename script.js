"use strict";

/* ---------- 1. The collection: data ---------- */

const gearItems = [
    { id: 1, name: "Monitor", category: "PC", detail: "1920x1080 display running at 240Hz." },
    { id: 2, name: "Processor", category: "PC", detail: "Intel® Core™ i7-10700K, 3.80 GHz base clock, up to 5.10 GHz boost." },
    { id: 3, name: "Graphics card", category: "PC", detail: "NVIDIA® GeForce® RTX 4060 with 8 GB of dedicated GDDR6." },
    { id: 4, name: "RAM", category: "PC", detail: "32 GB of DDR4-3200 SDRAM (2 x 16 GB)." },
    { id: 5, name: "Storage", category: "PC", detail: "1 TB NVMe SSD." },
    { id: 6, name: "Headset", category: "PC", detail: "Corsair HS80." },
    { id: 7, name: "Mouse", category: "PC", detail: "Razer Viper V3 HyperSpeed." },
    { id: 8, name: "Mousepad", category: "PC", detail: "Njoy Tech Stratos." },
    { id: 9, name: "Weightlifting belt", category: "Gym", detail: "Lumbar support for heavy squats and deadlifts." },
    { id: 10, name: "Lifting straps", category: "Gym", detail: "Better grip for pull-ups, rows and deadlifts." },
    { id: 11, name: "Training shoes", category: "Gym", detail: "Flat sole for stability during squats and leg press." },
    { id: 12, name: "Ergonomic chair", category: "Desk", detail: "Lumbar support for long study and coding sessions." },
];

let nextGearId = gearItems.length + 1;
let currentCategory = "all";
let currentQuery = "";

/* One function builds an item node, whether called at load or later. */
function createGearItem(item) {
    const li = document.createElement("li");
    li.className = "gear-item";
    li.dataset.id = String(item.id);

    const header = document.createElement("div");
    header.className = "gear-item-header";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const badge = document.createElement("span");
    badge.className = "gear-category-badge";
    badge.textContent = item.category;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "gear-toggle";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.textContent = "See more";

    header.append(name, badge, toggleBtn);

    const detail = document.createElement("p");
    detail.className = "gear-detail";
    detail.textContent = item.detail;
    detail.hidden = true;

    li.append(header, detail);
    return li;
}

function matchesFilter(item) {
    const inCategory = currentCategory === "all" || item.category === currentCategory;
    const query = currentQuery.trim().toLowerCase();
    const inQuery = query === ""
        || item.name.toLowerCase().includes(query)
        || item.detail.toLowerCase().includes(query);
    return inCategory && inQuery;
}

function renderGearList() {
    const list = document.querySelector("#gear-list");
    const emptyMessage = document.querySelector("#gear-empty");

    list.textContent = "";
    const filtered = gearItems.filter(matchesFilter);
    filtered.forEach((item) => list.appendChild(createGearItem(item)));

    emptyMessage.hidden = filtered.length !== 0;
}

/* ---------- 2. Filtering, live ---------- */

function initGearFilter() {
    const searchField = document.querySelector("#gear-search");
    searchField.addEventListener("input", (event) => {
        currentQuery = event.target.value;
        renderGearList();
    });

    const categoryButtons = document.querySelectorAll(".category-filter button");
    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            categoryButtons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            currentCategory = button.dataset.category;
            renderGearList();
        });
    });
}

/* ---------- 3. Adding items ---------- */

function initGearForm() {
    const form = document.querySelector("#gear-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.querySelector("#gear-name");
        const categoryInput = document.querySelector("#gear-category-input");
        const detailInput = document.querySelector("#gear-detail-input");

        const name = nameInput.value.trim();
        const category = categoryInput.value;
        const detail = detailInput.value.trim();

        if (name === "" || detail === "") return;

        gearItems.push({ id: nextGearId++, name, category, detail });

        nameInput.value = "";
        detailInput.value = "";
        nameInput.focus();

        renderGearList();
    });
}

/* ---------- 4. Expand/collapse, one delegated listener ---------- */

function initGearDelegation() {
    const list = document.querySelector("#gear-list");
    list.addEventListener("click", (event) => {
        const button = event.target.closest(".gear-toggle");
        if (!button) return;

        const item = button.closest(".gear-item");
        const detail = item.querySelector(".gear-detail");
        const expanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? "See more" : "See less";
        detail.hidden = expanded;
    });
}

/* ---------- 5. Contact form validation ---------- */

function initContactForm() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");

    const fields = {
        name: {
            input: document.querySelector("#name"),
            error: document.querySelector("#name-error"),
        },
        email: {
            input: document.querySelector("#email"),
            error: document.querySelector("#email-error"),
        },
        message: {
            input: document.querySelector("#message"),
            error: document.querySelector("#message-error"),
        },
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasSubmitted = false;

    function validateField(key) {
        const { input, error } = fields[key];
        const value = input.value.trim();
        let message = "";

        if (key === "name" && value === "") {
            message = "Please enter your name.";
        } else if (key === "email") {
            if (value === "") message = "Please enter your email.";
            else if (!emailPattern.test(value)) message = "Please enter a valid email.";
        } else if (key === "message" && value.length < 10) {
            message = "Your message must be at least 10 characters long.";
        }

        error.textContent = message;
        return message === "";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        hasSubmitted = true;

        const results = Object.keys(fields).map(validateField);
        const allValid = results.every(Boolean);

        if (allValid) {
            status.textContent = "Thanks! Your message has been recorded.";
            status.className = "success";
            form.reset();
            hasSubmitted = false;
        } else {
            status.textContent = "";
            status.className = "";
        }
    });

    Object.keys(fields).forEach((key) => {
        fields[key].input.addEventListener("input", () => {
            if (hasSubmitted) validateField(key);
        });
    });
}

/* ---------- 6. Theme toggle ---------- */

function initThemeToggle() {
    const button = document.querySelector("#theme-toggle");
    button.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        button.setAttribute("aria-pressed", String(isDark));
        button.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    });
}

/* ---------- Init ---------- */

renderGearList();
initGearFilter();
initGearForm();
initGearDelegation();
initContactForm();
initThemeToggle();
