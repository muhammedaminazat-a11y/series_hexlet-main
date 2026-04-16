import { getSeries, saveSeries } from './storage.js';
import { initBurgerMenu, escapeHtml } from './utils.js';

initBurgerMenu();
initIndexPage();

function initIndexPage() {
  const seriesList = document.getElementById('seriesList');
  const seriesCounter = document.getElementById('seriesCounter');

  if (!seriesList || !seriesCounter) {
    return;
  }

  renderItems();

  function renderItems() {
    const series = getSeries();

    seriesCounter.textContent = `Всего сериалов: ${series.length}`;

    if (series.length === 0) {
      seriesList.innerHTML = `
        <div class="empty-state">
          <h3>Пока нет сериалов</h3>
          <p>Нажми «Добавить сериал», чтобы создать первый элемент.</p>
        </div>
      `;
      return;
    }

    seriesList.innerHTML = '';

    series.forEach(function (item) {
      const percent = Math.round((item.watched / item.episodes) * 100);
      const imageSrc = item.image ? item.image : 'Image/image.png';

      const card = document.createElement('article');
      card.className =
        item.completed ? 'product-card product-card--completed' : 'product-card';

      card.innerHTML = `
        <div class="product-card__image">
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}">
        </div>

        <div class="product-card__body">
          <h3 class="product-card__title">${escapeHtml(item.title)}</h3>

          <div class="product-card__meta">
            <span>${escapeHtml(item.category)}</span>
            <span class="product-card__price">${item.watched}/${item.episodes}</span>
          </div>

          <p class="product-card__progress">Прогресс: ${percent}%</p>

          <label class="status-toggle">
            <input type="checkbox" class="status-checkbox" ${item.completed ? 'checked' : ''}>
            <span>${item.completed ? 'Просмотрено' : 'Не просмотрено'}</span>
          </label>

          <button class="product-card__btn product-card__btn--danger js-remove-btn">
            Удалить
          </button>
        </div>
      `;

      const checkbox = card.querySelector('.status-checkbox');
      const removeButton = card.querySelector('.js-remove-btn');

      checkbox.addEventListener('change', function () {
        toggleStatus(item.id);
      });

      removeButton.addEventListener('click', function () {
        removeItem(item.id);
      });

      seriesList.appendChild(card);
    });
  }

  function toggleStatus(id) {
    const series = getSeries().map(function (item) {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    });

    saveSeries(series);
    renderItems();
  }

  function removeItem(id) {
    const isConfirmed = confirm('Удалить сериал?');

    if (!isConfirmed) {
      return;
    }

    const filteredSeries = getSeries().filter(function (item) {
      return item.id !== id;
    });

    saveSeries(filteredSeries);
    renderItems();
  }
}