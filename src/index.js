import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import { getPhoto } from './getPhoto';

const searchFormEl = document.querySelector('#search-form');
const listEl = document.querySelector('.js-photos');

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const {
    searchQuery: { value: searchQuery },
  } = e.currentTarget.elements;

  console.log(searchQuery);

  getPhoto(searchQuery).then(data => createListHTML(data.hits));
}

function createListHTML(data) {
  listEl.innerHTML = createMarkup(data);
}

function createMarkup(arr) {
  console.log(arr);
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li data-photoId="1">
           <img src="${(webformatURL, largeImageURL)}" alt="${tags}" />
            <div>
               <p><span>likes</span>${likes}</p>
               <p><span>views</span>${views}</p>
               <p><span>comments</span>${comments}</p>
               <p><span>downloads</span>${downloads}</p>
            </div>
          </li>`;
      }
    )
    .join();
}
