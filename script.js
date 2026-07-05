const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const form = document.querySelector(".register-form");
const formStatus = document.querySelector(".form-status");

const savedTheme = localStorage.getItem("trishoka-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
  updateThemeLabel();
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  if (nextTheme === "light") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = nextTheme;
  }
  localStorage.setItem("trishoka-theme", nextTheme);
  updateThemeLabel();
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thank you. Trishoka has received your query.";
  form.reset();
});

function updateThemeLabel() {
  const isDark = root.dataset.theme === "dark";
  themeLabel.textContent = isDark ? "Light" : "Dark";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}
