import NewsApiServes from './rest-api';
import { onError } from './renderPopularNews';
import {
  hidCategorySectionOnError,
  makeHiddenThumb,
  makeVisibleThumb,
  makeVisibleCategories,
  showCategorySectionOnError,
} from './categories/isHidden';
import Notiflix from 'notiflix';
import { createCard } from './cardMarkup';
import weatherTemplate from '../template/weatherTemplate';
import { getWeatherWidget } from './weather';
import { updateMarkup } from './markupUtils';
import { addEvtListOnReadMore } from './onReadLink';
import closeError from './renderPopularNews';

const news = new NewsApiServes();

export default async function onSearchSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const storage = localStorage.getItem('selectedDateKey');
  news.setDate = quotesReplace(storage);
  news.query = e.target.elements.word.value;
  pagianteSearchNews();

  async function pagianteSearchNews() {
    try {
      const response = await news.searchNewsByInputAndDate();
      const articles = response.data.response.docs;
      if (articles.length === 0) {
        throw new Error('No data');
      } else if (response.status === 429) {
        throw new Error();
      }

      const paginationEL = document.querySelector('.pagination');
      paginationEL.innerHTML = '';
      let curentPage = 1;
      let numResults = articles.length;
      let newsPerPage = 4;
      let n = 0;
      if (window.innerWidth > 768 && window.innerWidth < 1280) {
        newsPerPage = 7;
        n = 1;
      }

      if (window.innerWidth > 1280) {
        newsPerPage = 8;
        n = 2;
      }

      async function randerNews(articles, newsPerPage, curentPage) {
        const newsContainerEl = document.querySelector('.news-container');
        const start = newsPerPage * (curentPage - 1);
        const end = newsPerPage * curentPage;
        const paginatedNews = articles.slice(start, end);

        const arrNews = paginatedNews.map(news => {
          return createCard(news);
        });
        arrNews.splice(n, 0, weatherTemplate());
        const markup = arrNews.join('');

        getWeatherWidget();
        updateMarkup(markup, newsContainerEl);
        showCategorySectionOnError();
        makeHiddenThumb();

        addEvtListOnReadMore(articles);
        makeVisibleCategories();
      }

      const countPage = Math.ceil(numResults / newsPerPage);

      function displayPaginator(countPage) {
        const ulEl = document.createElement('ul');
        ulEl.classList.add('pagination__list');

        for (let i = 0; i < countPage; i++) {
          const liEL = displayPaginationBtn(i + 1);
          ulEl.appendChild(liEL);
        }

        paginationEL.appendChild(ulEl);
      }

      function displayPaginationBtn(page) {
        const liEl = document.createElement('li');
        liEl.classList.add('pagination__item');
        liEl.innerText = page;

        if (curentPage == page) {
          liEl.classList.add('pagination__item--active');
        }

        liEl.addEventListener('click', () => {
          curentPage = page;
          randerNews(articles, newsPerPage, curentPage);

          let currentActiveLi = document.querySelector(
            '.pagination__item--active'
          );
          currentActiveLi.classList.remove('pagination__item--active');
          liEl.classList.add('pagination__item--active');
        });
        return liEl;
      }
      randerNews(articles, newsPerPage, curentPage);
      displayPaginator(countPage);
    } catch (error) {
      document.querySelector('.pagination').innerHTML = '';
      document.querySelector('.news-container').innerHTML = '';
      hidCategorySectionOnError();
      onError();
    }
  }
}

function quotesReplace(quote) {
  return quote.replace('"', '').replace('"', '');
}
