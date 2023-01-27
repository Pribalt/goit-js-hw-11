import './sass/index.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/getPhotoAPI';
import { createMarkup } from './js/createMarkup';
import { observer } from './js/observer';

const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
const guardEl = document.querySelector('.js-guard');

const newApiService = new NewApiService();

// ------------------------------- fixed header with navigation -------------------------------
// console.log(
//   document.querySelector('.js-page-header').getBoundingClientRect().height
// );

const { height: pageHeaderHeight } = document
  .querySelector('.js-page-header')
  .getBoundingClientRect();

document.body.style.paddingTop = `${pageHeaderHeight}px`;
searchFormEl.style.height = `${pageHeaderHeight}px`;
// -------------------------------------------------------------------------------

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

let totalImg = 0;

searchFormEl.addEventListener('submit', onSearch);
// loadMoreBtnEl.addEventListener('click', fetchMarkup);

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.searchQuery.value;

  if (!newApiService.query.trim()) {
    console.log(newApiService.query);
    return Notiflix.Notify.failure(
      'The search field is empty. Please enter the value!'
    );
  }

  clearMarkup();

  newApiService.resetPage();

  fetchMarkup();
}

function fetchMarkup(params) {
  newApiService
    .fetchPhoto()
    .then(({ totalHits, hits }) => {
      if (hits.length === 0 && totalHits === 0) {
        disable();

        clearMarkup();

        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (newApiService.page === 2) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }

      appendCreatMarkup(hits);

      observer.observe(guardEl);

      //  ------------------------Loadmore-----------------------
      // totalImg += hits.length;

      // if (totalHits === totalImg || totalImg >= 500) {
      //   Notiflix.Notify.info(
      //     "We're sorry, but you've reached the end of search results."
      //   );

      //   disable();
      // }
      //  --------------------------------------------------------
    })
    .catch(error => console.log(error));
}

function appendCreatMarkup(arr) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(arr));
  totalImg += arr.length;

  enable();

  lightBox.refresh();
}

function clearMarkup() {
  galleryEl.innerHTML = '';
}

function enable() {
  loadMoreBtnEl.hidden = false;
}
function disable() {
  loadMoreBtnEl.hidden = true;
}

export { newApiService, appendCreatMarkup, disable, guardEl, totalImg };
