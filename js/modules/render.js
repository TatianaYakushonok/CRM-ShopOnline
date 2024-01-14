import { createRows } from './createRows.js';

export const renderGoods = (arrObj) => {
  const table = document.querySelector('.table__body');
  table.innerHTML = '';
  const rows = arrObj.map(createRows);
  table.append(...rows);

  return table;
};
