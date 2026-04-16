import { getSeries } from './storage.js';
import { renderEmptyState, createSeriesCard } from './ui.js';
import { initCatalogPage } from './catalog.js';

initBurgerMenu();
initModal();
initHomeSeries();
initCatalogPage();

function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (!burger || !nav) {
    return;
  }

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
    document.body.classList.toggle('no-scroll');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a') || event.target.closest('button')) {
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--open');
      document.body.classList.remove('no-scroll');
    }
  });
}

function initModal() {
  const modal = document.getElementById('authModal');
  const openButtons = document.querySelectorAll('.header__cta');
  const closeModal = document.getElementById('closeModal');

  if (!modal || !openButtons.length || !closeModal) {
    return;
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function initHomeSeries() {
  const homeSeries = document.getElementById('homeSeries');

  if (!homeSeries) {
    return;
  }

  let data = getSeries();

  if (data.length === 0) {
    renderEmptyState(homeSeries, 'Пока нет сериалов. Добавьте их в каталоге.');
    return;
  }

  data = data.slice(-3).reverse();
  homeSeries.innerHTML = '';

  data.forEach((item) => {
    const card = createSeriesCard(
      item,
      () => {},
      () => {}
    );

    const addButton = card.querySelector('.js-add-episode');
    const removeButton = card.querySelector('.js-remove-series');

    if (addButton) addButton.remove();
    if (removeButton) removeButton.remove();

    homeSeries.appendChild(card);
  });
}