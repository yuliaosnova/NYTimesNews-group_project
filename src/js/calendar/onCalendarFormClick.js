import { ref } from './refs-calendar';

export default function onCalendarFormClick() { 
  ref.calendarWrapper.classList.toggle('closed');
  ref.calendarForm.classList.toggle('selected');
}
