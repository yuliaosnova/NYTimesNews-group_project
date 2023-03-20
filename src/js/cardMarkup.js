import { FAV_BUTTON_ICON_EMPTY_HTML } from './fav/constants';
import { cutText, cutTitle, formatDate } from './markupUtils';

export function createCard({
  section_name,
  web_url,
  headline,
  lead_paragraph,
  pub_date,
  multimedia,
  snippet,
}) {
  return `
        <li class="news-item">
        <div class="overlay"></div>
        <div class="img-thumb">
        <span class="readable"
        >Already read
        <svg class="icon-done" width="18" height="18" viewBox="0 0 32 32"><path d="M28.78 6.39c-0.277 0.008-0.54 0.124-0.733 0.323l-16.313 16.313-6.713-6.713c-0.098-0.102-0.216-0.184-0.346-0.24s-0.27-0.086-0.412-0.088c-0.142-0.001-0.283 0.025-0.414 0.079s-0.251 0.133-0.351 0.233c-0.1 0.1-0.18 0.22-0.233 0.351s-0.081 0.272-0.079 0.414c0.001 0.142 0.031 0.282 0.087 0.412s0.138 0.248 0.24 0.346l7.467 7.467c0.2 0.2 0.471 0.312 0.754 0.312s0.554-0.112 0.754-0.312l17.067-17.067c0.154-0.15 0.259-0.343 0.302-0.553s0.021-0.429-0.063-0.627c-0.084-0.198-0.225-0.366-0.406-0.482s-0.393-0.175-0.607-0.168v0z"></path></svg>
          </span>
          <img src="${
            !multimedia[0]
              ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
              : 'https://www.nytimes.com/' + multimedia[0].url
          }" loading="lazy" alt="${!multimedia ? 'NYTimes' : snippet}" class="news-img" />
          <p class="news-chip">${section_name}</p>
          <button type="button" class="add-news-favorite">
            <p class="favorite-btn-text">Add to favorite</p>
            <svg class="favorite-icon" width="16" height="16" viewBox="0 0 32 32">
             ${FAV_BUTTON_ICON_EMPTY_HTML} 
            </svg> 
          </button>
        </div>
        <div class="news-info">
          <h2 class="news-title disable-scroll">
            ${cutTitle(headline.main)}
          </h2>
          <p class="news-desk">
          ${cutText(lead_paragraph)}
          </p>
          <div class="adding">
            <p class="news-date">${formatDate(pub_date)}</p>
            <a
              href=${web_url}
              class="news-link"
              target="_blank"
              rel="noopener noreferrer"
              >Read more</a
            >
          </div>
        </div>
      </li> `;
}

export function createCardPop({
  media,
  title,
  section,
  subsection,
  abstract,
  published_date,
  url,
}) {
  return `
        <li class="news-item">
        <div class="overlay"></div>
        <div class="img-thumb">
            <img src="${
              !media[0]
                ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
                : !media
                ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
                : media[0]['media-metadata'][2].url
            }" loading="lazy" alt="${!media[0] ? 'NYTimes' : media[0].caption}" class="news-img" />
            <p class="news-chip">${section || subsection}</p>
            <span class="readable"
                    >Already read
                    <svg class="icon-done" width="18" height="18" viewBox="0 0 32 32"><path d="M28.78 6.39c-0.277 0.008-0.54 0.124-0.733 0.323l-16.313 16.313-6.713-6.713c-0.098-0.102-0.216-0.184-0.346-0.24s-0.27-0.086-0.412-0.088c-0.142-0.001-0.283 0.025-0.414 0.079s-0.251 0.133-0.351 0.233c-0.1 0.1-0.18 0.22-0.233 0.351s-0.081 0.272-0.079 0.414c0.001 0.142 0.031 0.282 0.087 0.412s0.138 0.248 0.24 0.346l7.467 7.467c0.2 0.2 0.471 0.312 0.754 0.312s0.554-0.112 0.754-0.312l17.067-17.067c0.154-0.15 0.259-0.343 0.302-0.553s0.021-0.429-0.063-0.627c-0.084-0.198-0.225-0.366-0.406-0.482s-0.393-0.175-0.607-0.168v0z"></path></svg>
            </span>
            <button type="button" class="add-news-favorite">
              <p class="favorite-btn-text">Add to favorite</p>
              <svg class="favorite-icon" width="16" height="16" viewBox="0 0 32 32">
               ${FAV_BUTTON_ICON_EMPTY_HTML}
              </svg>
            </button>
        </div>
        <div class="news-info">
          <h2 class="news-title disable-scroll">
            ${cutTitle(title)}
          </h2>
          <p class="news-desk">
          ${cutText(abstract)}
          </p>
          <div class="adding">
            <p class="news-date">${formatDate(published_date)}</p>
            <a
              href=${url}
              class="news-link"
              target="_blank"
              rel="noopener noreferrer"
              >Read more</a
            >
          </div>
        </div>
      </li> `;
}

export function categoryCard({ section, url, abstract, title, published_date, multimedia }) {
  return `
        <li class="news-item">
        <div class="overlay"></div>
        <div class="img-thumb">
        <span class="readable"
        >Already read
        <svg class="icon-done" width="18" height="18" viewBox="0 0 32 32"><path d="M28.78 6.39c-0.277 0.008-0.54 0.124-0.733 0.323l-16.313 16.313-6.713-6.713c-0.098-0.102-0.216-0.184-0.346-0.24s-0.27-0.086-0.412-0.088c-0.142-0.001-0.283 0.025-0.414 0.079s-0.251 0.133-0.351 0.233c-0.1 0.1-0.18 0.22-0.233 0.351s-0.081 0.272-0.079 0.414c0.001 0.142 0.031 0.282 0.087 0.412s0.138 0.248 0.24 0.346l7.467 7.467c0.2 0.2 0.471 0.312 0.754 0.312s0.554-0.112 0.754-0.312l17.067-17.067c0.154-0.15 0.259-0.343 0.302-0.553s0.021-0.429-0.063-0.627c-0.084-0.198-0.225-0.366-0.406-0.482s-0.393-0.175-0.607-0.168v0z"></path></svg>
          </span>
          <img src="${
            !multimedia
              ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
              : String(multimedia) === 'null'
              ? 'https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/The_New_York_Times.jpg'
              : multimedia[2].url
          }" loading="lazy" alt="${
    !multimedia ? 'NYTimes' : String(multimedia) === 'null' ? 'NYTimes' : multimedia[2].caption
  }"
    class="news-img" />
          <p class="news-chip">${section}</p>
          <button type="button" class="add-news-favorite">
            <p class="favorite-btn-text">Add to favorite</p>
            <svg class="favorite-icon" width="16" height="16" viewBox="0 0 32 32">
             ${FAV_BUTTON_ICON_EMPTY_HTML}
                </svg> 
          </button>
        </div>
        <div class="news-info">
          <h2 class="news-title disable-scroll">
            ${cutTitle(title)}
          </h2>
          <p class="news-desk">
          ${cutText(abstract)}
          </p>
          <div class="adding">
            <p class="news-date">${formatDate(published_date)}</p>
            <a
              href=${url}
              class="news-link"
              target="_blank"
              rel="noopener noreferrer"
              >Read more</a
            >
          </div>
        </div>
      </li> `;
}
