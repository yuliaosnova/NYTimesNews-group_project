import NewsApiServes from './rest-api';
import { createCardPop } from './cardMarkup';
import {
  makeVisibleCategories,
  makeHiddenCategories,
  hidCategorySectionOnError,
  makeHiddenThumb,
  showCategorySectionOnError,
} from './categories/isHidden';
import { updateMarkup } from './markupUtils';
import { getWeatherWidget } from './weather';
import weatherTemplate from '../template/weatherTemplate';
import { addEvtListOnReadMore, setCurrentPage } from './onReadLink';
import { makeVisibleCategories } from './categories/isHidden';
import { onError } from './renderPopularNews';
import { readLinksStyling } from './readLinksStyling';
const news = new NewsApiServes();

export async function pagiantePopularNews() {
  try {
    const response = await news.requestPopularNews();
    const articles = response.data.results;
    if (articles.length === 0) {
      throw new Error('No data');
    } else if (response.status === 429) {
      throw new Error();
    }
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
        return createCardPop(news);
      });
      arrNews.splice(n, 0, weatherTemplate());
      const markup = arrNews.join('');
      getWeatherWidget();
      updateMarkup(markup, newsContainerEl);
      makeHiddenThumb();
      showCategorySectionOnError();
      makeVisibleCategories();
      addEvtListOnReadMore(articles);
      readLinksStyling();
    }

    const countPage = Math.ceil(numResults / newsPerPage);

    function displayPaginator(countPage) {
      const paginationEL = document.querySelector('.pagination');
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
        setCurrentPage(page, newsPerPage);
        randerNews(articles, newsPerPage, curentPage);

        let currentActiveLi = document.querySelector('.pagination__item--active');
        currentActiveLi.classList.remove('pagination__item--active');
        liEl.classList.add('pagination__item--active');
      });
      return liEl;
    }
    randerNews(articles, newsPerPage, curentPage);
    displayPaginator(countPage);
  } catch (error) {
    hidCategorySectionOnError();
    onError();
  }
}
if (document.title === 'NYTimes News') {
  pagiantePopularNews();
}
