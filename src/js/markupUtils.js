export function cutText(string) {
  const quantityChar = 115;
  return string.length <= quantityChar
    ? string
    : string.slice(0, quantityChar) + '...';
}

export function cutTitle(string) {
  const quantityChar = 72;
  return string.length < quantityChar
    ? string
    : string.slice(0, quantityChar) + '...';
}

export function updateMarkup(markup, elem) {
  elem.innerHTML = markup;
}

export function formatDate(strg) {
  if (!strg) return null;

  strg = cutDate(strg);
  // console.log(strg);

  const pubDate = new Date(strg);
  const yyyy = pubDate.getFullYear();
  let mm = pubDate.getMonth() + 1;
  let dd = pubDate.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const str = `${dd + '/' + mm + '/' + yyyy}`;
  return str;
}

function cutDate(date) {
  const regexp = /(\d+-\d+-\d+)/g;
  const hits = date.match(regexp);
  if (hits !== null) return hits[0];
  return date;
}
