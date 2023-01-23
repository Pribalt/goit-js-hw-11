import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewApiService } from './js/getPhotoAPI';
import shablonMarkup from './templates/photo-card.hbs';

const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

const newApiService = new NewApiService();

let totalImg = 0;

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);

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
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        loadMoreBtnEl.hidden = false;
      }

      clearShablonGallery();
      appendShablonMarkup({ hits });
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  newApiService
    .fetchPhoto()
    .then(({ totalHits, hits }) => {
      appendShablonMarkup({ hits });

      totalImg += hits.length;

      if (totalHits === totalImg) {
        loadMoreBtnEl.hidden = true;

        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => console.log(error));
}

function appendShablonMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', shablonMarkup(hits));
}

function clearShablonGallery() {
  galleryEl.innerHTML = '';
}

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
console.log(lightBox);
lightBox.refresh();
