import { v4 } from 'uuid'; // генерация уникальных id
import TItem from '../../models/item';
import update from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';
import './stats.css';

interface IStatsProps {
  list: TItem[];
  updateHandler: (item: TItem) => void;
  removeHandler: (date: string) => void;
}

const Stats = ({ list, updateHandler, removeHandler }: IStatsProps) => {
  // FIXME: как сделать, чтобы при событии 'change' не перерисовывался каждый раз весь 'Stats' ???

  return (
    <div className="stats">
      <ul className="stats__title-list">
        <li className="stats__title-item">Дата (ДД.ММ.ГГ)</li>
        <li className="stats__title-item">Пройдено км</li>
        <li className="stats__title-item">Действия</li>
      </ul>
      <ul className="stats__info-list">
        {list.map((item) => (
          <li key={v4()} className="stats__info-item">
            <div className="stats__info-date">{item.date}</div>
            <div className="stats__info-km">{item.km}</div>
            <div className="stats__info-change">
              <img
                src={update}
                className="stats__info-update"
                alt="update"
                onClick={() => updateHandler(item)}
              ></img>
              <img
                src={remove}
                className="stats__info-remove"
                alt="remove"
                onClick={() => removeHandler(item.date)}
              ></img>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
