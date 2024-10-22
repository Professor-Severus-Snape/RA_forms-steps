import TItem from "../models/item";

// сортировка дат по убыванию:
const sortDates = (dateList: TItem[]) => {
  dateList.sort((first: TItem, second: TItem) => {
    const firstDate = 20 + first.date.split('.').reverse().join('-'); // 17.10.24 -> 2024-10-17
    const secondDate = 20 + second.date.split('.').reverse().join('-'); // 18.10.24 -> 2024-10-18
    return Date.parse(secondDate) - Date.parse(firstDate); // парсим даты в формате ISO 8601
  });
};

export default sortDates;
