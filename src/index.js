import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/getPhotoAPI';
import shablonMarkup from './templates/photo-card.hbs';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);

const newApiService = new NewApiService();

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
      if (totalHits === 0) {
        loadMoreBtnEl.hidden = true;
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }

      clearShablonGallery();
      appendShablonMarkup({ hits });

      loadMoreBtnEl.hidden = false;
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  newApiService
    .fetchPhoto()
    .then(({ hits }) => {
      appendShablonMarkup({ hits });
    })
    .catch(error => console.log(error));
}

function appendShablonMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', shablonMarkup(hits));
}

function clearShablonGallery() {
  galleryEl.innerHTML = '';
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
