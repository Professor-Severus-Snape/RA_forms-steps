import { useState } from 'react';
import Stats from '../Stats/Stats';
import './form.css';

// где лучше расположить - внутри компонента 'Form' или снаружи ???
const initialFormState = {
  date: '',
  km: '',
};

// как передать данные, не вынося переменную в глобальную область видимости ???
let props = initialFormState;

const Form = () => {
  const [form, setForm] = useState(initialFormState);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    props = initialFormState; // очищение пропсов - как  правильно ???

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

    props = form; // где надо формировать пропс для компонента 'Stats' и как ???

    setForm(initialFormState); // очищаем форму
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
      <Stats props={props} /> {/* <- корректные пропсы только! при валидном submit-е */}
    </>
  );
};

export default Form;
