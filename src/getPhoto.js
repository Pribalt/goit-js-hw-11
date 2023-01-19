const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32953111-1e0841424fa9175caa9620a35';

export const getPhoto = name => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
// getPhoto('cat').then(data => console.log(data.hits));
