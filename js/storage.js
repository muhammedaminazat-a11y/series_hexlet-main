const STORAGE_KEY = 'seriesData';

export function getSeries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveSeries(series) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(series));
}