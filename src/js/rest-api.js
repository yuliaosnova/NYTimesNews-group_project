const axios = require('axios').default;
const NEWS_URL = 'https://api.nytimes.com/svc/';
const NEWS_API_KEY = '58DF9bTBBQf2RU8WY5JE6TkVJf8iLJ4A';
const WEATHER_URL = 'https://api.openweathermap.org/';
const WEATHER_API_KEY = '26ee5cfba4c9a8162c8c1ca031ae1bc4';

export default class NewsApiServes {
  constructor() {
    this.searchQuery = '';
    this.categoryQuery = '';
    this.setDate = '';
    this.offset = 0;
    this.limit = 0;
    this.page = 0;
    this.cardOrder = 0;
  }

  async requestListCategories() {
    if (document.title !== 'NYTimes News') {
      return;
    }
    const response = await axios.get(
      `${NEWS_URL}news/v3/content/section-list.json?api-key=${NEWS_API_KEY}`
    );
    return response;
  }

  get categories() {
    return axios
      .get(
        `${NEWS_URL}news/v3/content/section-list.json?api-key=${NEWS_API_KEY}`
      )
      .then(x => x.data.results)
      .catch(error => console.log(error));
  }

  async requestPopularNews() {
    const response = await axios.get(
      `${NEWS_URL}mostpopular/v2/viewed/1.json?api-key=${NEWS_API_KEY}`
    );

    return response;
  }

  async requestWeatherApi(lat, lon) {
    if (document.title !== 'NYTimes News') {
      return;
    }
    const response = await axios.get(
      `${WEATHER_URL}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    return response.data;
  }

  async requestGeoApi(lat, lon) {
    if (document.title !== 'NYTimes News') {
      return;
    }
    const response = await axios.get(
      `${WEATHER_URL}geo/1.0/reverse?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    return response.data;
  }

  async requestWeatherApiDefault() {
    if (document.title !== 'NYTimes News') {
      return;
    }
    const response = await axios.get(
      `${WEATHER_URL}data/2.5/weather?q=Kyiv&units=metric&appid=${WEATHER_API_KEY}`
    );

    return response.data;
  }

  async searchNewsOnClick() {
    const response = await axios.get(
      `${NEWS_URL}news/v3/content/all/${this.categoryQuery}.json?&limit=40&api-key=${NEWS_API_KEY}`
    );

    return response;
  }

  // new
  getCategory(category, offset = 1) {
    return axios
      .get(
        `${NEWS_URL}news/v3/content/all/${category}.json?&offset=${offset}&limit=40&api-key=${NEWS_API_KEY}`
      )
      .then(x => x.data.results)
      .catch(error => console.log(error));
  }

  async searchNewsByInputAndDate() {
    const response = await axios.get(
      `${NEWS_URL}search/v2/articlesearch.json?q=${this.searchQuery}&begin_date=${this.setDate}&end_date=${this.setDate}&page=${this.page}&api-key=${NEWS_API_KEY}`
    );

    return response;
  }

  sizeScreenCompute() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.limit = 4;
      this.cardOrder = 0;
    } else if (window.matchMedia('(max-width: 1279px)').matches) {
      this.limit = 7;
      this.cardOrder = 1;
    } else {
      this.limit = 8;
      this.cardOrder = 2;
    }
  }

  incrementPagination() {
    this.offset += this.limit;
  }

  decrementPagination() {
    this.offset -= this.limit;
  }

  resetOffset() {
    this.offset = 0;
  }
  offset() {
    return this.offset;
  }

  limit() {
    return this.limit;
  }

  pageIncrementPagination() {
    this.page += 1;
  }

  pageDecrementPagination() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 0;
  }

  page() {
    return this.page;
  }

  getCardOrder() {
    return this.cardOrder;
  }

  get date() {
    return this.setDate;
  }

  set date(newDate) {
    this.setDate = newDate;
  }

  get category() {
    return this.categoryQuery;
  }

  set category(newCategory) {
    this.categoryQuery = newCategory;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearch) {
    this.searchQuery = newSearch;
  }
}
