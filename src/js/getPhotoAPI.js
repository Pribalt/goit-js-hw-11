import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32953111-1e0841424fa9175caa9620a35';

class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchPhoto() {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&per_page=${this.per_page}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`
    );

    this.page += 1;

    return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

export { NewApiService };
