'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const form = document.querySelector('.form');
const formCheckDiscount = document.querySelector('.form__checkbox_discount');
const formInputDiscount = document.querySelector('.form__input_discount');
const formTotalPrice = document.querySelector('.form__total-price');

import goods from './goods.json' assert { type: 'json' };

const createRow = (obj) => {
  const tr = document.createElement('tr');
  for (let key in obj) {
    tr.innerHTML += `<td>${obj[key]}</td>`;
  }

  return tr;
};

const renderGoods = (arrObj) => {
  const table = document.createElement('table');
  arrObj.map((item) => {
    table.append(createRow(item));
  });

  return table;
};

console.log(renderGoods(goods));
