const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const settings = JSON.parse(localStorage.getItem("dwmSettings") || "{}");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

function applySettings() {
  const dark = settings.darkMode ?? prefersDark;
  document.body.classList.toggle("dark-mode", dark);
  document.body.classList.toggle("large-text", !!settings.largeText);
  document.body.classList.toggle("no-animations", settings.animations === false);
  const darkInput = $("#darkMode"), largeInput = $("#largeText"), animationsInput = $("#animations");
  if (darkInput) darkInput.checked = dark;
  if (largeInput) largeInput.checked = !!settings.largeText;
  if (animationsInput) animationsInput.checked = settings.animations !== false;
}
function saveSettings() {
  localStorage.setItem("dwmSettings", JSON.stringify(settings));
  applySettings();
}
applySettings();

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
  mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("open")));
}

["darkMode","largeText","animations"].forEach(id => {
  const el = $("#" + id);
  if (!el) return;
  el.addEventListener("change", () => {
    settings[id] = el.checked;
    saveSettings();
  });
});

const reset = $("#resetSettings");
if (reset) reset.addEventListener("click", () => {
  localStorage.removeItem("dwmSettings");
  Object.keys(settings).forEach(k => delete settings[k]);
  applySettings();
});

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, {threshold: 0.12});
$$(".reveal").forEach(el => observer.observe(el));

const form = $("#quoteForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const type = $("#websiteType").value;
    const message = $("#message").value.trim();
    const status = $("#formStatus");

    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid name, email address and project description.";
      return;
    }

    const subject = encodeURIComponent(`DWM Website Enquiry - ${type}`);
    const body = encodeURIComponent(
      `Hello Dannywebmakers DWM,\n\nName: ${name}\nEmail: ${email}\nWebsite type: ${type}\n\nProject details:\n${message}\n\nSent from the DWM website.`
    );
    status.textContent = "Opening your email app with the enquiry...";
    window.location.href = `mailto:drlldanny@gmail.com?subject=${subject}&body=${body}`;
  });
}
