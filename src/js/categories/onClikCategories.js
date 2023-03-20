import { ref } from './refCaregories';
import createArrayNews from '../cards/createArrayNews';
import weatherTemplate from '../../template/weatherTemplate';
import createCards from '../cards/createCards';
import queueWeather from '../../js/countCard';
import { getWeatherWidget } from '../../js/weather';
import { categoryCard } from '../cardMarkup';
import { updateMarkup } from '../markupUtils';
import { onError } from '../renderPopularNews';
import { addEvtListOnReadMore } from '../onReadLink';


export default async function onClikCategories(news, e) {
  // if pressed <svg> or <span>
  let btn = e.target.nodeName !== 'BUTTON' ? e.target.parentNode : e.target;

  btn = btn.nodeName !== 'BUTTON' ? btn.parentNode : btn; // if pressed <use>

  if (btn.nodeName !== 'BUTTON') return; // if pressed <li.categories__item-drop>

  if (ref.drop !== btn) {
    ref.dropList.classList.add('visually-hidden'); //close .categories__list-drop

    ref.dropList.classList.remove('isActiveCateg');

    const dataByCategory = await news.getCategory(btn.dataset.category);
    pagianteCtegoryNews()





    async function pagianteCtegoryNews() {
      try {
        const response = await news.getCategory(btn.dataset.category);
        if (response.status === 429) {
          throw new Error();
        } else
        if (response.length === 0) {
          throw new Error('No data');
        }
      const paginationEL = document.querySelector('.pagination');
      paginationEL.innerHTML = "";
    const articles = response;
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
      const paginatedNews = articles.slice(start, end)
      
        const arrNews = paginatedNews.map(news => {
            return categoryCard(news);
        })
        arrNews.splice(n, 0, weatherTemplate())
      const markup = arrNews.join('')
      
        getWeatherWidget();
        updateMarkup(markup, newsContainerEl);
		  // console.log(markup);
		  addEvtListOnReadMore(articles);
    }

    const countPage = Math.ceil(numResults / newsPerPage)

    function displayPaginator(countPage) {
        
        const ulEl = document.createElement("ul"); 
        ulEl.classList.add('pagination__list');

        for (let i = 0; i < countPage; i++) {
            const liEL = displayPaginationBtn(i+1)
            ulEl.appendChild(liEL)
        }

        paginationEL.appendChild(ulEl)

    }
    
    function displayPaginationBtn(page) {
        const liEl = document.createElement("li");
        liEl.classList.add('pagination__item');
        liEl.innerText = page;

        if (curentPage == page) {
            liEl.classList.add('pagination__item--active')}

        liEl.addEventListener("click", () => {
            curentPage = page;
            randerNews(articles, newsPerPage, curentPage)

            let currentActiveLi = document.querySelector('.pagination__item--active');
            currentActiveLi.classList.remove('pagination__item--active');
            liEl.classList.add('pagination__item--active');
        })
        return liEl;
    }
    randerNews(articles, newsPerPage, curentPage);
    displayPaginator(countPage);
        
      } catch {
        document.querySelector('.pagination').innerHTML = '';
        document.querySelector('.news-container').innerHTML = '';
        onError();
      }
  

}




 //   const filterArr = createArrayNews(dataByCategory);

    // const queueWeat = queueWeather();
    // const strInj = dataByCategory
      // .map((el, i) => (i === queueWeat ? weatherTemplate() : createCards(el)))
      // .join('');

    // const strInj =  createCards(dataByCategory);
    // document.querySelector('.news-container').innerHTML = strInj;
    // getWeatherWidget();

  }
  // else {
  //   document.querySelector('.isActiveCateg')?.classList.remove('isActiveCateg');
  //   btn.parentNode.classList.toggle('isActiveCateg');
  //   return;
  // }
  document.querySelector('.isActiveCateg')?.classList.remove('isActiveCateg');

  btn.parentNode.classList.add('isActiveCateg');
}



