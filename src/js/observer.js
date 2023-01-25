import Notiflix from 'notiflix';
import { smoothScrolling } from './smoothScrolling';
import {
  newApiService,
  appendCreatMarkup,
  disable,
  guardEl,
  totalImg,
} from '..//index';

let options = {
  root: null,
  rootMargin: '500px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      newApiService
        .fetchPhoto()
        .then(({ totalHits, hits }) => {
          appendCreatMarkup(hits);

          disable();

          smoothScrolling();

          if (totalHits === totalImg || totalImg >= 500) {
            observer.unobserve(guardEl);

            return Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(error => console.log(error));
    }
  });
}

export { observer };
