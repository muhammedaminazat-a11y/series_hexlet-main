import { getSeries, saveSeries } from './storage.js';
import { renderEmptyState, createSeriesCard } from './ui.js';

export function initCatalogPage() {
  const form = document.getElementById('seriesForm');
  const seriesList = document.getElementById('seriesList');

  if (!form || !seriesList) {
    return;
  }

  let seriesData = getSeries();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const imageInput = document.getElementById('image');
    const episodesInput = document.getElementById('episodes');
    const watchedInput = document.getElementById('watched');

    const title = titleInput.value.trim();
    const image = imageInput ? imageInput.value.trim() : '';
    const episodes = Number(episodesInput.value);
    let watched = Number(watchedInput.value);

    if (!title || episodes < 1 || watched < 0) {
      alert('Заполните поля правильно.');
      return;
    }

    if (watched > episodes) {
      watched = episodes;
    }

    const newSeries = {
      id: Date.now(),
      title,
      image,
      episodes,
      watched
    };

    seriesData.push(newSeries);
    saveSeries(seriesData);
    form.reset();
    renderCatalog();
  });

  function addEpisode(id) {
    seriesData = seriesData.map((item) => {
      if (item.id === id && item.watched < item.episodes) {
        return {
          ...item,
          watched: item.watched + 1
        };
      }
      return item;
    });

    saveSeries(seriesData);
    renderCatalog();
  }

  function removeSeries(id) {
    seriesData = seriesData.filter((item) => item.id !== id);
    saveSeries(seriesData);
    renderCatalog();
  }

  function renderCatalog() {
    seriesData = getSeries();

    if (seriesData.length === 0) {
      renderEmptyState(seriesList, 'Добавьте первый сериал через форму выше.');
      return;
    }

    seriesList.innerHTML = '';

    seriesData.forEach((item) => {
      const card = createSeriesCard(item, addEpisode, removeSeries);
      seriesList.appendChild(card);
    });
  }

  renderCatalog();
} 