import Notiflix from 'notiflix';
import NewsApiServes from './rest-api';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const news = new NewsApiServes();
let refs = {};

function creatMarkupWeather() {
  if (document.title !== 'NYTimes News') {
    return;
  }
  refs = {
    deg: document.querySelector('.deg'),
    iconPlace: document.querySelector('.icon-location'),
    weatherTemp: document.querySelector('.weather__temp-deg'),
    weatherCondition: document.querySelector('.weather__condition'),
    weatherLocation: document.querySelector('.weather__location-place'),
    weatherIcon: document.querySelector('#icon-weather'),
    weatherDay: document.querySelector('.weather__day-week'),
    weatherFullDate: document.querySelector('.weather__month'),
    weatherLinkSite: document.querySelector('.weather__link-site'),
  };
  return refs;
}

// Отримання координат поточного місцязнаходження
let latitude = +localStorage.getItem('USER_LATITUDE');
let longitude = +localStorage.getItem('USER_LONGITUDE');

// Запит на отримання поточного місцязнаходження
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findLocation, errorHandler);
  } else {
    Notiflix.Notify.failure('Sorry, browser does not support geolocation!');
  }
}

// Відмова від надання координат
function errorHandler(error) {
  if (error.code == error.PERMISSION_DENIED) {
    //   функция дефолтного запиту
    markupWeatherCardDefault();
    Notiflix.Notify.failure('Error: Access is denied!');
  }
}

// Успішне отримання координат поточного місця
function findLocation(pos) {
  let crd = pos.coords;
  let userLatitude = crd.latitude;
  let userLongitude = crd.longitude;
  localStorage.setItem('USER_LATITUDE', userLatitude);
  localStorage.setItem('USER_LONGITUDE', userLongitude);
  markupWeatherCard();
}

news.requestWeatherApiDefault();

// Функції для отримання поточної дати/місяця/року
let date = new Date();

function getCurrentWeekDay(date) {
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  return days[date.getDay()];
}

function getCurrentFullDate(date) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let fullDate =
    date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  return fullDate;
}

//! Єдина функція для віджету погоди

function getWeatherWidget() {
  getCurrentLocation();
}

// Функція для дінамичного додавання даних з API до розмітки при наданні користувачем своїх координат
async function markupWeatherCard() {
  const data = await news.requestWeatherApi(latitude, longitude);
  const geo = await news.requestGeoApi(latitude, longitude);
  creatMarkupWeather();
  refs.weatherTemp.textContent = Math.floor(data.main.temp);
  refs.weatherLocation.textContent = data.name;
  refs.weatherCondition.textContent = data.weather[0].main;
  refs.weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  refs.weatherDay.textContent = getCurrentWeekDay(date);
  refs.weatherFullDate.textContent = getCurrentFullDate(date);
  refs.weatherLinkSite.setAttribute(
    'href',
    `https://www.wunderground.com/forecast/${geo[0].country}/${geo[0].name}`
  );
}

// Функція для дінамичного додавання даних з API до розмітки з дефолтним значенням (Київ)
async function markupWeatherCardDefault() {
  const data = await news.requestWeatherApiDefault();
  console.log(data);
  creatMarkupWeather();
  refs.weatherTemp.textContent = Math.floor(data.main.temp);
  refs.weatherLocation.textContent = data.name;
  refs.weatherCondition.textContent = data.weather[0].main;
  refs.weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  refs.weatherDay.textContent = getCurrentWeekDay(date);
  refs.weatherFullDate.textContent = getCurrentFullDate(date);
  refs.weatherLinkSite.setAttribute(
    'href',
    `https://www.wunderground.com/forecast/ua/Kyiv`
  );
}

export { getWeatherWidget };
