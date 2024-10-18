import { useState } from 'react';
import Form from './components/Form/Form';
import TItem from './models/item';
import Stats from './components/Stats/Stats';

const App = () => {
  const [form, setForm] = useState<TItem>({ date: '', km: '' });
  const [list, setList] = useState<TItem[]>([]);

  // обработчик cобытия 'change' на инпутах:
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentForm = { ...form, [name]: value.trim().replace(',', '.') };
    setForm(currentForm); // ререндер (состояние form) -> обновление полей формы
  };

  // обработчик cобытия 'submit' на форме:
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidData()) {
      const newList = createNewList(); // свежий массив с актуальными данными
      setList(newList); // ререндер (состояние list) -> актуализация массива с данными
      setForm({ date: '', km: '' }); // ререндер (состояние form) -> очистка полей формы
    }
  };

  // проверка валидности данных формы:
  const isValidData = () => {
    let flag = true;

    // проверка даты:
    if (!form.date.match(/\d{2}\.\d{2}\.\d{2}/)) {
      setForm({ ...form, date: '' }); // ререндер (состояние form) -> сброс инпута с датой
      flag = false;
    } else {
      const inputDate = 20 + form.date.split('.').reverse().join('-'); // '2024-10-17'
      // текущая дата с учетом часовых поясов ('2024-10-17'):
      const localDate = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 1000 * 60
      )
        .toISOString()
        .slice(0, 10);
      // если дату нельзя распарсить или она ещё не наступила (1731801600000 > 1729183981966):
      if (
        isNaN(Date.parse(inputDate)) ||
        Date.parse(inputDate) > Date.parse(localDate)
      ) {
        setForm({ ...form, date: '' }); // ререндер (состояние form) -> сброс инпута с датой
        flag = false;
      }
    }

    // проверка километража:
    if (!Number(form.km)) {
      setForm({ ...form, km: '' }); // ререндер (состояние form) -> сброс инпута с километражем
      flag = false;
    }

    return flag;
  };

  // создание нового массива с актуализированными данными:
  const createNewList = () => {
    let newList: TItem[] = [];
    const km = (+form.km).toFixed(1); // округление km до десятых долей

    if (list.length) {
      const idx = list.findIndex((el) => el.date === form.date);
      if (idx === -1) {
        newList = [...list, { ...form, km }];
        sortDates(newList); // сортируем массив по датам
      } else {
        newList = list.map((item, index) => {
          if (index === idx) {
            item.km = (Number(item.km) + Number(km)).toFixed(1); // округление km при сложении
          }
          return item;
        });
      }
    } else {
      newList = [{ ...form, km }];
    }

    return newList;
  };

  // сортировка дат по убыванию:
  const sortDates = (newList: TItem[]) => {
    newList.sort((first: TItem, second: TItem) => {
      const firstDate = 20 + first.date.split('.').reverse().join('-'); // 17.10.24 -> 2024-10-17
      const secondDate = 20 + second.date.split('.').reverse().join('-'); // 18.10.24 -> 2024-10-18
      return Date.parse(secondDate) - Date.parse(firstDate); // парсим даты в формате ISO 8601
    });
  };

  const handleUpdateItem = (item: TItem) => {
    setList(list.filter((el) => el.date !== item.date)); // ререндер (состояние list) -> фильтруем
    setForm(item); // ререндер (состояние form) -> перекидываем данные элемента в форму
  };

  const handleRemoveItem = (date: string) => {
    setList(list.filter((el) => el.date !== date)); // ререндер (состояние list) -> фильтруем массив
  };

  return (
    <>
      <Form form={form} onInputChange={handleInputChange} onSubmit={handleSubmit} />
      <Stats list={list} onUpdate={handleUpdateItem} onRemove={handleRemoveItem} />
    </>
  );
};

export default App;
