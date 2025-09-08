document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year')?.textContent = new Date().getFullYear();
  // no-op if nav-toggle absent
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) navToggle.addEventListener('click', () => document.body.classList.toggle('menu-open'));
});
