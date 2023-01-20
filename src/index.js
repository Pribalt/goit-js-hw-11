import './css/styles.css';
import { onSearch } from './js/onSearch';

const searchFormEl = document.querySelector('#search-form');

searchFormEl.addEventListener('submit', onSearch);
