import { createRows } from './createRows.js';

export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('p');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  }

  const table = document.querySelector('.table__body');
  table.innerHTML = '';
  const rows = data.goods.map(createRows);
  table.append(...rows);

  return table;
};
