export function readLinksStyling() {
  if (String(localStorage.getItem('read')) === 'null') {
    return;
  }

  const cardsForCheck = document.querySelectorAll('[class="news-item"]');

  const readList = JSON.parse(localStorage.getItem('read'));
  const readLinks = readList.map(newsItem => {
    if (newsItem.url) {
      return newsItem.url;
    } else if (newsItem.web_url) {
      return newsItem.web_url;
    }
  });
  cardsForCheck.forEach(card => {
    if (
      readLinks.includes(card.querySelector('.news-link').getAttribute('href'))
    ) {
      card.classList.add('read-card');
    }
  });
}
