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
  setMenuState(!navLinks.classList.contains("is-open"));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuState(false);
  }
});

document.addEventListener("click", (event) => {
  if (navLinks.classList.contains("is-open") && !event.target.closest(".nav-shell")) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    setMenuState(false);
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

function setMenuState(isOpen) {
  navLinks.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}
