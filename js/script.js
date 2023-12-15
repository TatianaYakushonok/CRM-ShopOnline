'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const form = document.querySelector('.form');
const formCheckDiscount = document.querySelector('.form__checkbox_discount');
const formInputDiscount = document.querySelector('.form__input_discount');
const formTotalPrice = document.querySelector('.form__total-price');

import goods from './goods.json' assert { type: 'json' };

const createRows = ({ id, title, category, units, count, price }) => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');

  const tdId = document.createElement('td');
  tdId.classList.add('table__ceil');
  tdId.textContent = id;

  const tdTitle = document.createElement('td');
  tdTitle.classList.add('table__ceil');
  tdTitle.textContent = title;

  const tdCategory = document.createElement('td');
  tdCategory.classList.add('table__ceil');
  tdCategory.textContent = category;

  const tdUnits = document.createElement('td');
  tdUnits.classList.add('table__ceil', 'table__ceil_units');
  tdUnits.textContent = units;

  const tdCount = document.createElement('td');
  tdCount.classList.add('table__ceil', 'table__ceil_count');
  tdCount.textContent = count;

  const tdPrice = document.createElement('td');
  tdPrice.classList.add('table__ceil', 'table__ceil_price');
  tdPrice.textContent = `$${price}`;

  const tdTotalPrice = document.createElement('td');
  tdTotalPrice.classList.add('table__ceil', 'table__ceil_total-sum');
  tdTotalPrice.textContent = `$${price * count}`;

  tr.append(tdId, tdTitle, tdCategory, tdUnits, tdCount, tdPrice, tdTotalPrice);

  return tr;
};

const renderGoods = (arrObj) => {
  const table = document.querySelector('.table__body');
  const rows = arrObj.map(createRows);
  table.append(...rows);

  return table;
};

renderGoods(goods);
