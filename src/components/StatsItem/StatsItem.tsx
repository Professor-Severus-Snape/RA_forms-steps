import TItem from '../../models/item';
import update from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';
import './statsItem.css';

interface IStatsItemsProps {
  item: TItem;
  updateHandler: (item: TItem) => void;
  removeHandler: (date: string) => void;
}

const StatsItem = ({ item, updateHandler, removeHandler }: IStatsItemsProps) => {
  return (
    <li className="stats__info-item">
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
  );
};

export default StatsItem;
