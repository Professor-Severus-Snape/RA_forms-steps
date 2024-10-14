import { v4 } from 'uuid';
import StatsItem from '../StatsItem/StatsItem';
import TItem from '../../models/item';
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
        {list.map((obj) => (
          <StatsItem
            key={v4()}
            item={obj}
            updateHandler={updateHandler}
            removeHandler={removeHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default Stats;
