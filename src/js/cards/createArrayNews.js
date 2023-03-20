export default function createArrayNews(list) {
  // return list.reduce(
  //   (a, { multimedia, url, title, abstract, created_date }) => {
  //     if (multimedia && multimedia[2] && multimedia.caption)
  //       [...a, { multimedia, url, title, abstract, created_date }];
  //   },
  //   []
  // );
  const arr = [];
  for (let i = 0; i < list.length; i++) {
    const { multimedia, url, title, abstract, published_date } = list[i];
    if (
      multimedia &&
      multimedia[0]?.url &&
      multimedia[0]?.caption &&
      url &&
      title &&
      abstract &&
      published_date
    )
      arr.push({
        multimedia,
        url,
        title,
        abstract,
        published_date,
      });
  }
  console.log(arr);
  return arr;
}
