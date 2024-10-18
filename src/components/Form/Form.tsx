import TItem from '../../models/item';
import './form.css';

interface IFormProps {
  form: TItem;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ form, onInputChange, onSubmit }: IFormProps) => {
  return (
    <form className="form" onSubmit={onSubmit}>
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          value={form.km}
        />
      </div>
      <button className="form__button" type="submit">
        ОК
      </button>
    </form>
  );
};

export default Form;
