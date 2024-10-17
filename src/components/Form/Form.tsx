import { useState } from 'react';
import Stats from '../Stats/Stats';
import TItem from '../../models/item';
import './form.css';

const Form = () => {
  const [form, setForm] = useState<TItem>({ date: '', km: '' });
  const [list, setList] = useState<TItem[]>([]); // FIXME: кто владелец состояния ???

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value.trim().replace(',', '.') }); // изменение состояния
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // если введенные данные валидны:
    if (checkData()) {
      const newList = createNewList(); // свежий массив с актуальными данными
      setList(newList); // изменение состояния <- обновляем list актуальными данными
      setForm({ date: '', km: '' }); // изменение состояния <- очищаем форму
    }
  };

  // проверка валидности введённых данных:
  const checkData = () => {
    let flag = true;

    // проверка даты:
    if (!form.date.match(/\d{2}\.\d{2}\.\d{2}/)) {
      setForm({ ...form, date: '' }); // изменение состояния
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
        setForm({ ...form, date: '' }); // изменение состояния <- очищаем поле даты
        flag = false;
      }
    }

    // проверка километража:
    if (!Number(form.km)) {
      setForm({ ...form, km: '' }); // изменение состояния <- очищаем поле километража
      flag = false;
    }

    return flag;
  };

  const createNewList = () => {
    let newList: TItem[] = [];
    const km: string = (+form.km).toFixed(1); // округление km до десятых долей

    if (list.length) {
      const idx = list.findIndex((el) => el.date === form.date);
      if (idx === -1) {
        newList = [...list, { ...form, km }];
        sortDates(newList);
      } else {
        newList = list.map((item, index) => {
          if (index === idx) {
            item.km = (Number(item.km) + Number(km)).toFixed(1); // округление km при сложении
          }
          return item;
        });
      }
    } else {
      newList = [...list, { ...form, km }];
    }

    return newList;
  };

  // сортировка дат по убыванию:
  const sortDates = (newList: TItem[]) => {
    newList.sort((first: TItem, second: TItem) => {
      const firstDate = 20 + first.date.split('.').reverse().join('-'); // 13.10.24 -> 2024-10-13
      const secondDate = 20 + second.date.split('.').reverse().join('-'); // 14.10.24 -> 2024-10-14
      return Date.parse(secondDate) - Date.parse(firstDate); // парсим даты формата ISO 8601
    });
  };

  const handleUpdate = (item: TItem) => {
    setList(list.filter((el) => el.date !== item.date)); // фильтруем массив, не мутируя его
    setForm(item); // изменение состояния <- перекидываем данные из элемента в форму
  };

  const handleRemove = (date: string) => {
    setList(list.filter((el) => el.date !== date)); // фильтруем массив, не мутируя его
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__date">
          <label htmlFor="date" className="form__date-label">
            Дата (ДД.ММ.ГГ):
          </label>
          <input
            id="date"
            className="form__date-input"
            type="text"
            minLength={8}
            maxLength={8}
            placeholder="Введите верно дату ..."
            required
            name="date"
            onChange={handleChange}
            value={form.date}
          />
        </div>
        <div className="form__km">
          <label htmlFor="km" className="form__km-label">
            Пройдено км:
          </label>
          <input
            id="km"
            className="form__km-input"
            type="text"
            maxLength={6}
            placeholder="Пройденное расстояние в км ..."
            required
            name="km"
            onChange={handleChange}
            value={form.km}
          />
        </div>
        <button className="form__button" type="submit">
          ОК
        </button>
      </form>

      {/* FIXME: Как не перерисовывать заново весь компонент при событии onChange ??? */}
      <Stats list={list} onUpdate={handleUpdate} onRemove={handleRemove} />
    </>
  );
};

export default Form;
