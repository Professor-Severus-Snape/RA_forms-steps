import { useState } from 'react';
import Stats from '../Stats/Stats';
import TItem from '../../models/item';
import './form.css';

// FIXME: где лучше расположить - внутри компонента 'Form' или снаружи ???
const initialFormState: TItem = {
  date: '',
  km: '',
};

// FIXME: где лучше расположить - внутри компонента 'Form' или снаружи ???
const initialListState: TItem[] = [];

const Form = () => {
  const [form, setForm] = useState<TItem>(initialFormState);
  const [list, setList] = useState<TItem[]>(initialListState); // FIXME: кто владелец состояния ???

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value.trim().replace(',', '.') });
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // проверка даты на валидность:
    if (!form.date.match(/\d{2}\.\d{2}\.\d{2}/)) {
      setForm({ ...form, date: '' });
      return;
    }

    // проверка километража на валидность:
    if (!Number(form.km)) {
      setForm({ ...form, km: '' });
      return;
    }

    form.km = (+form.km).toFixed(1); // округление километража до десятых долей
    addData(); // обновление массива 'initialListState'
    setList(initialListState); // изменение состояния <- массив 'list' NOTE: нет ререндера !!!
    setForm(initialFormState); // изменение состояние <- очищаем форму NOTE: есть ререндер !!!
  }

  function addData() {
    if (initialListState.length) {
      const idx = initialListState.findIndex((el) => el.date === form.date);
      if (idx === -1) {
        // TODO: добавить сортировку массива !!!
        initialListState.push(form);
      } else {
        initialListState[idx].km = (
          +form.km + +initialListState[idx].km
        ).toFixed(1);
      }
    } else {
      initialListState.push(form);
    }
  }

  function updateHandler(item: TItem) {
    const idx = initialListState.findIndex((el) => el.date === item.date);
    initialListState.splice(idx, 1); // удаляем элемент из Stats
    setList(initialListState); // формируем новый список для Stats NOTE: нет ререндера !!!
    setForm(item); // меняем состояние -> переносим данные в форму NOTE: есть ререндер!!!
  }

  function removeHandler(date: string) {
    const idx = initialListState.findIndex((el) => el.date === date);
    initialListState.splice(idx, 1); // удаляем элемент из Stats
    setList(initialListState); // формируем новый список для Stats NOTE: нет ререндера !!!
    // setForm(form);                                           // NOTE: нет ререндера !!!
    // setForm(initialFormState);                               // NOTE: нет ререндера !!!
    setForm({ ...form }); // FIXME: как правильно вызвать ререндер в этой функции ???
  }

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
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
            placeholder="Введите верно дату.."
            required
            name="date"
            onChange={changeHandler}
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
            placeholder="Пройденное расстояние в км..."
            required
            name="km"
            onChange={changeHandler}
            value={form.km}
          />
        </div>
        <button className="form__button" type="submit">
          ОК
        </button>
      </form>

      {/* FIXME: Как не перерисовывать заново весь компонент при событии onChange ??? */}
      <Stats
        list={list}
        updateHandler={updateHandler}
        removeHandler={removeHandler}
      />
    </>
  );
};

export default Form;
