import { v4 } from 'uuid';
import StatsItem from '../StatsItem/StatsItem';
import TItem from '../../models/item';
import './stats.css';

interface IStatsProps {
  list: TItem[];
  onUpdate: (item: TItem) => void;
  onRemove: (date: string) => void;
}

const Stats = ({ list, onUpdate, onRemove }: IStatsProps) => {
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
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </div>
  );
};

export default Stats;
