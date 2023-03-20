import addLeadingZero from './addLeadingZero';
import {save} from '../localStorageService';

// getting new Date, current year and month
  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

export {  date, currYear, currMonth };

// getting current date year and month for API at start and save in LocalStorage

export default function todayDate () {
  const todayDateValue = `${currYear}${addLeadingZero(currMonth + 1)}${addLeadingZero(date.getDate())}`;
  save('selectedDateKey', todayDateValue);
}