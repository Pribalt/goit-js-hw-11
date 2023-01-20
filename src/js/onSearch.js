import Notiflix from 'notiflix';
import shablonMarkup from '../templates/photo-card.hbs';
import { getPhoto } from './getPhoto';

const galleryEl = document.querySelector('.gallery');

export const onSearch = e => {
  e.preventDefault();

  //   const {
  //     searchQuery: { value: searchQuery },
  //   } = e.currentTarget.elements;

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (!searchQuery) {
    return;
  }

  getPhoto(searchQuery)
    .then(({ totalHits, hits }) => {
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      }

      galleryEl.innerHTML = shablonMarkup({ hits });
    })
    .catch(error => console.log(error));
};
