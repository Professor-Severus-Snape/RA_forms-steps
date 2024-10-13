import './form.css';

const Form = () => {
  return (
    <div className="form">
      <div className="form__date">
        <label htmlFor="date" className="form__date-label">
          Дата (ДД.ММ.ГГ):
        </label>
        <input
          id="date"
          className="form__date-input"
          type="text"
          placeholder="Введите дату.."
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
          placeholder="Пройденное расстояние в км..."
        />
      </div>
      <button className="form__button" type="button">
        ОК
      </button>
    </div>
  );
};

export default Form;
