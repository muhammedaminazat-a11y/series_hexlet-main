export function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (!burger || !nav) {
    return;
  }

  burger.addEventListener('click', function () {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
    document.body.classList.toggle('no-scroll');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--open');
      document.body.classList.remove('no-scroll');
    }
  });
}

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}