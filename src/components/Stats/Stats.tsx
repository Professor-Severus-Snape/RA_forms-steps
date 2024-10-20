import StatsItem from '../StatsItem/StatsItem';
import TItem from '../../models/item';
import './stats.css';

interface IStatsProps {
  list: TItem[];
  onUpdate: (item: TItem) => void;
  onRemove: (date: string) => void;
}

const Stats = ({ list, onUpdate, onRemove }: IStatsProps) => {
  const statItems = list.map((obj) => (
    <StatsItem key={obj.date} item={obj} onUpdate={onUpdate} onRemove={onRemove} />
  ));

  return (
    <div className="stats">
      <ul className="stats__title-list">
        <li className="stats__title-item">Дата (ДД.ММ.ГГ)</li>
        <li className="stats__title-item">Пройдено км</li>
        <li className="stats__title-item">Действия</li>
      </ul>
      <ul className="stats__info-list">{statItems}</ul>
    </div>
  );
};

export default Stats;
