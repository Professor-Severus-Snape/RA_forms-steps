import { v4 } from 'uuid'; // генерация уникальных id
import TItem from '../../models/item';
import update from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';
import './stats.css';

interface IStatsProps {
  props: TItem;
}

const initialState: TItem[] = []; // массив объектов

const Stats = ({ props }: IStatsProps) => {
  if (props.date && props.km) {
    if (initialState.length) {
      const idx = initialState.findIndex((el) => el.date === props.date);
      if (idx === -1) {
        // TODO: реализовать сортировку по датам и приведение даты к 'ГГГГ'
        initialState.push(props);
      } else {
        initialState[idx].km = (+props.km + +initialState[idx].km).toFixed(1);
      }
    } else {
      initialState.push(props);
    }
  }

  return (
    <div className="stats">
      <ul className="stats__title-list">
        <li className="stats__title-item">Дата (ДД.ММ.ГГ)</li>
        <li className="stats__title-item">Пройдено км</li>
        <li className="stats__title-item">Действия</li>
      </ul>
      <ul className="stats__info-list">
        {initialState.map((item) => (
          <li key={v4()} className="stats__info-item">
            <div className="stats__info-date">{item.date}</div>
            <div className="stats__info-km">{item.km}</div>
            <div className="stats__info-change">
              <img
                src={update}
                className="stats__info-update"
                alt="update"
              ></img>
              <img
                src={remove}
                className="stats__info-remove"
                alt="remove"
              ></img>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
