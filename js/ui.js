export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function renderEmptyState(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <h3>Пока нет сериалов</h3>
      <p>${message}</p>
    </div>
  `;
}

export function createSeriesCard(item, onAddEpisode, onRemoveSeries) {
  const percent = Math.round((item.watched / item.episodes) * 100);
  const imageSrc =
    item.image && item.image.length > 0
      ? item.image
      : 'Image/image.png';

  const isCompleted = item.watched >= item.episodes;

  const card = document.createElement('article');
  card.className = isCompleted
    ? 'product-card product-card--completed'
    : 'product-card';

  card.innerHTML = `
    <div class="product-card__image">
      <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}">
    </div>

    <div class="product-card__body">
      <h3 class="product-card__title">${escapeHtml(item.title)}</h3>

      <div class="product-card__meta">
        <span>Просмотрено: ${item.watched}</span>
        <span class="product-card__price">Всего: ${item.episodes}</span>
      </div>

      <p class="product-card__progress">Прогресс: ${percent}%</p>

      ${isCompleted ? '<p class="product-card__done">Сериал завершён ✔</p>' : ''}

      ${
        isCompleted
          ? '<button class="product-card__btn product-card__btn--complete" disabled>Просмотр завершён</button>'
          : '<button class="product-card__btn js-add-episode">+ 1 серия</button>'
      }

      <button class="product-card__btn product-card__btn--danger js-remove-series">
        Удалить
      </button>
    </div>
  `;

  const addButton = card.querySelector('.js-add-episode');
  const removeButton = card.querySelector('.js-remove-series');

  if (addButton) {
    addButton.addEventListener('click', () => onAddEpisode(item.id));
  }

  if (removeButton) {
    removeButton.addEventListener('click', () => onRemoveSeries(item.id));
  }

  return card;
}