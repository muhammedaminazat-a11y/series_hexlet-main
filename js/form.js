import { getSeries, saveSeries } from './storage.js';
import { initBurgerMenu } from './utils.js';

initBurgerMenu();
initFormPage();

function initFormPage() {
  const form = document.getElementById('seriesForm');

  if (!form) {
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');
    const imageInput = document.getElementById('image');
    const episodesInput = document.getElementById('episodes');
    const watchedInput = document.getElementById('watched');

    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    const image = imageInput.value.trim();
    const episodes = Number(episodesInput.value);
    const watched = Number(watchedInput.value);

    if (!title || !category || !episodesInput.value) {
      alert('Заполните все обязательные поля.');
      return;
    }

    if (episodes < 1) {
      alert('Количество серий должно быть больше нуля.');
      return;
    }

    if (watched < 0) {
      alert('Количество просмотренных серий не может быть отрицательным.');
      return;
    }

    if (watched > episodes) {
      alert('Просмотренных серий не может быть больше общего количества.');
      return;
    }

    const newSeries = {
      id: Date.now(),
      title: title,
      category: category,
      image: image,
      episodes: episodes,
      watched: watched,
      completed: watched === episodes
    };

    const currentSeries = getSeries();
    currentSeries.push(newSeries);
    saveSeries(currentSeries);

    window.location.href = 'index.html';
  });
}