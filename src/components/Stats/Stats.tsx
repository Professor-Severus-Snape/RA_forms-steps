import update from '../../assets/pencil.svg';
import remove from '../../assets/remove.svg';

import './stats.css';

const Stats = () => {
  return (
    <div className="stats">
      <ul className="stats__title-list">
        <li className="stats__title-item">Дата (ДД.ММ.ГГ)</li>
        <li className="stats__title-item">Пройдено км</li>
        <li className="stats__title-item">Действия</li>
      </ul>
      <ul className="stats__info-list">
        <li className="stats__info-item">
          <div className="stats__info-date">20.07.2019</div>
          <div className="stats__info-km">5.7</div>
          <div className="stats__info-change">
            <img src={update} className="stats__info-update" alt="update"></img>
            <img src={remove} className="stats__info-remove" alt="remove"></img>
          </div>
        </li>
        <li className="stats__info-item">
          <div className="stats__info-date">20.07.2019</div>
          <div className="stats__info-km">5.7</div>
          <div className="stats__info-change">
            <img src={update} className="stats__info-update" alt="update"></img>
            <img src={remove} className="stats__info-remove" alt="remove"></img>
          </div>
        </li>
        <li className="stats__info-item">
          <div className="stats__info-date">20.07.2019</div>
          <div className="stats__info-km">5.7</div>
          <div className="stats__info-change">
            <img src={update} className="stats__info-update" alt="update"></img>
            <img src={remove} className="stats__info-remove" alt="remove"></img>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
