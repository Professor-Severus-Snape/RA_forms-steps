import TItem from '../../models/item';
import update from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';
import './statsItem.css';

interface IStatsItemsProps {
  item: TItem;
  onUpdate: (item: TItem) => void;
  onRemove: (date: string) => void;
}

const StatsItem = ({ item, onUpdate, onRemove }: IStatsItemsProps) => {
  return (
    <li className="stats__info-item">
      <div className="stats__info-date">{item.date}</div>
      <div className="stats__info-km">{item.km}</div>
      <div className="stats__info-change">
        <img
          src={update}
          className="stats__info-update"
          alt="update"
          onClick={() => onUpdate(item)}
        />
        <img
          src={remove}
          className="stats__info-remove"
          alt="remove"
          onClick={() => onRemove(item.date)}
        />
      </div>
    </li>
  );
};

export default StatsItem;
