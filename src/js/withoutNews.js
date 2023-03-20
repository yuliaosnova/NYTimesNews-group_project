export function withoutNews() {
  if (String(document.querySelector('.not-found-image')) !== 'null') {
    return;
  }
  function createGag() {
    return `<h2 class="not-found">We haven’t found any news</h2>
    <img class="not-found-image" srcset="
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap1x.png          601w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap1x-tablet.png   560w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap1x-mobile.png   248w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap2x.png          1202w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap2x-tablet.png   1120w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap2x-mobile.png   496w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap3x.png          1803w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap3x-tablet.png     1680w,
                  https://raw.githubusercontent.com/MaxF1996/NYTimesNews/main/src/images/gap3x-mobile.png   744w,
                " sizes="(min-width: 1280px) 601px, (min-width: 768px) 560px, 248px" src="./images/gap1x.png" alt="Not found">`;
  }
  const field = document.querySelector('.main');
  if (document.querySelectorAll('.news-item').length < 1) {
    if (document.title === 'NYTimes News: Your Favorites') {
      document.querySelector('.news-container').remove();
    } else if (document.title === 'NYTimes News: Read By Yourself') {
      document.querySelector('.read').remove();
    }

    field.insertAdjacentHTML('beforeend', createGag());
  }
}
