import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/getPhotoAPI';
import { createMarkup } from './js/createMarkup';

const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

const newApiService = new NewApiService();

let totalImg = 0;

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  newApiService.resetPage();

  if (!newApiService.query) {
    return;
  }

  newApiService
    .fetchPhoto()
    .then(({ totalHits, hits }) => {
      if (hits.length === 0) {
        createMarkupGallery();

        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      appendShablonMarkup(hits);

      enable();
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  newApiService
    .fetchPhoto()
    .then(({ totalHits, hits }) => {
      appendShablonMarkup(hits);

      totalImg += hits.length;

      if (totalHits === totalImg) {
        disable();

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function appendShablonMarkup(arr) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(arr));

  lightBox.refresh();
}

function createMarkupGallery() {
  galleryEl.innerHTML = '';
}

function enable() {
  loadMoreBtnEl.hidden = false;
}
function disable() {
  loadMoreBtnEl.hidden = true;
}
