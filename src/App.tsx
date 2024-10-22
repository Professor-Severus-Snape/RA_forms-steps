import { useState } from 'react';
import Form from './components/Form/Form';
import TItem from './models/item';
import Stats from './components/Stats/Stats';
import sortDates from './utils/sortDates';

const App = () => {
  const [form, setForm] = useState<TItem>({ date: '', km: '' });
  const [list, setList] = useState<TItem[]>([]);

  // обработчик cобытия 'change' на инпутах:
  const handleInputChange = (currentForm: TItem) => {
    setForm(currentForm); // ререндер (состояние form) -> обновление полей формы
  };

  // обработчик cобытия 'submit' на форме:
  const handleSubmit = (newForm: TItem) => {
    if (newForm.date === '' || newForm.km === '') {
      setForm(newForm); // ререндер (состояние form) -> сброс невалидного инпута
      return;
    }
    // если данные полей ввода валидны и полные:
    const newList = createNewList(newForm); // свежий массив с актуальными данными
    setList(newList); // ререндер (состояние list) -> актуализация массива с данными
    setForm({ date: '', km: '' }); // ререндер (состояние form) -> очистка полей формы
  };

  // создание нового массива с актуализированными данными:
  const createNewList = (newForm: TItem) => {
    let newList: TItem[] = [];
    const km = (+newForm.km).toFixed(1); // округление km до десятых долей

    if (list.length) {
      const idx = list.findIndex((el) => el.date === newForm.date);
      if (idx === -1) {
        newList = [...list, { ...newForm, km }];
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
      newList = [{ ...newForm, km }];
    }

    return newList;
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
