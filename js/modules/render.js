import { URL } from './constant.js';
import { createRows } from './createRows.js';
import { fetchRequest } from './fetchRequest.js';

export const renderGoods = () => {
  const table = document.querySelector('.table__body');
  table.innerHTML = '';
  fetchRequest(URL, {
    callback: createRows,
  });

  //table.append(...rows);

  return table;
};
