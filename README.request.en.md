## short explanation for working with query class

```json

import NewsApiServes from './rest-api';

const news = new NewsApiServes();

```

// -------------------------------------------------------------

# category list request

```json

console.log(news.requestListCategories());

```

// ---------------------------------------------------------------

# popular news list query

```json

console.log(news.requestPopularNews());

```

// --------------------------------------------------------------

# weather database query

```json

console.log(news.requestWeatherApi(34.1, 11.25));

```

// --------------------------------------------------------------

# search by category with pagination method

```json

 news.category = 'books';
 console.log(news.searchNewsOnClick());
 news.incrementPagination();
 console.log(news.offset);
 console.log(news.searchNewsOnClick());
 news.incrementPagination();
 console.log(news.offset);
 console.log(news.searchNewsOnClick());
 news.decrementPagination();
 console.log(news.offset);
 console.log(news.searchNewsOnClick());
 news.decrementPagination();
 console.log(news.offset);

```

// ----------------------------------------------------------------

# search by input and date with pagination method

```json

 news.setDate = '20230218';
 news.query = 'you';
 console.log(news.searchNewsByInputAndDate());
 news.pageIncrementPagination();
 console.log(news.searchNewsByInputAndDate());
 news.pageIncrementPagination();
 console.log(news.searchNewsByInputAndDate());
 news.pageDecrementPagination();
 console.log(news.searchNewsByInputAndDate());
 news.pageDecrementPagination();
 console.log(news.searchNewsByInputAndDate());

``


```
