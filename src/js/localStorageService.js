// Стандартні методи для роботи з Local Storage

const save = (key, value) => {
	try {
	  const serializedState = JSON.stringify(value); //получаем и преобразуем в JSON значение
	  localStorage.setItem(key, serializedState); //сохраняем значение в локальное хранилище
	} catch (error) {
	  console.error('Set state error: ', error.message);
	}
 };
 
 const load = key => {
	try {
	  const serializedState = localStorage.getItem(key); //получаем значение из хранилища
	  return serializedState === null ? undefined : JSON.parse(serializedState); //если в хранилище нет
	  //записи с таким ключом, метод возвращает null. Когда значение это обычнаяс строка -
	  //нет необходимости её парсить
	} catch (error) {
	  console.error('Get state error: ', error.message);
	}
 };
 
 const remove = key => {
	try {
	  const serializedState = localStorage.removeItem(key);
	} catch (error) {
	  console.error('Remove state error: ', error.message);
	}
 };
 
 export { save, load, remove };