'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const form = document.querySelector('.form');
const formCheckDiscount = document.querySelector('.form__checkbox_discount');
const formInputDiscount = document.querySelector('.form__input_discount');
const formTotalPrice = document.querySelector('.form__total-price');
const btnGoods = document.querySelector('.filter__btn-goods');
const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.form__btn_close');

import goods from './goods.json' assert { type: 'json' };

const openModal = (e) => {
  if (e.target.closest('.filter__btn-goods')) {
    modal.classList.add('modal__open');
    window.addEventListener('keydown', closeModal);
  }
};

const closeModal = (e) => {
  if (e.target.closest('.form__btn_close') || e.target === modal) {
    modal.classList.remove('modal__open');
    window.removeEventListener('keydown', closeModal);
  }
};

btnGoods.addEventListener('click', openModal);
modal.addEventListener('click', closeModal);

const createRows = ({ id, title, category, units, count, price }) => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');
  tr.insertAdjacentHTML(
    'beforeend',
    `
    <td class="table__ceil">${id}</td>
    <td class="table__ceil">${title}</td>
    <td class="table__ceil">${category}</td>
    <td class="table__ceil table__ceil_units">${units}</td>
    <td class="table__ceil table__ceil_count">${count}</td>
    <td class="table__ceil table__ceil_price">$${price}</td>
    <td class="table__ceil table__ceil_total-sum">$${price * count}</td>
    <td class="table__ceil table__ceil_btn">
      <button class="table__btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20"
          height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M18.75 2.13375L17.8663 1.25L1.25 17.8663L2.13375 18.75L3.38375 17.5H16.25C16.5814 17.4995 16.899 17.3676 17.1333 17.1333C17.3676 16.899 17.4995 16.5814 17.5 16.25V3.38375L18.75 2.13375ZM16.25 16.25H4.63375L9.50437 11.3794L10.9913 12.8663C11.2257 13.1006 11.5435 13.2322 11.875 13.2322C12.2065 13.2322 12.5243 13.1006 12.7587 12.8663L13.75 11.875L16.25 14.3731V16.25ZM16.25 12.605L14.6337 10.9888C14.3993 10.7544 14.0815 10.6228 13.75 10.6228C13.4185 10.6228 13.1007 10.7544 12.8663 10.9888L11.875 11.98L10.3894 10.4944L16.25 4.63375V12.605Z"
            fill="#6E6893" />
          <path
            d="M3.75 13.75V11.875L6.875 8.75187L7.73313 9.61062L8.61812 8.72563L7.75875 7.86625C7.52434 7.63191 7.20646 7.50027 6.875 7.50027C6.54354 7.50027 6.22566 7.63191 5.99125 7.86625L3.75 10.1075V3.75H13.75V2.5H3.75C3.41858 2.50033 3.10083 2.63213 2.86648 2.86648C2.63213 3.10083 2.50033 3.41858 2.5 3.75V13.75H3.75Z"
            fill="#6E6893" />
        </svg>
      </button>
      <button class="table__btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20"
          height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M15.5629 4.86078L17.6394 6.93629L15.5629 4.86078ZM16.8982 3.03233L11.2834 8.64709C10.9933 8.9368 10.7955 9.3059 10.7148 9.70789L10.1962 12.304L12.7923 11.7844C13.1942 11.704 13.5629 11.5069 13.8531 11.2167L19.4678 5.60196C19.6366 5.43324 19.7704 5.23293 19.8617 5.01248C19.953 4.79203 20 4.55576 20 4.31714C20 4.07853 19.953 3.84225 19.8617 3.6218C19.7704 3.40136 19.6366 3.20105 19.4678 3.03233C19.2991 2.8636 19.0988 2.72976 18.8784 2.63845C18.6579 2.54714 18.4216 2.50014 18.183 2.50014C17.9444 2.50014 17.7081 2.54714 17.4877 2.63845C17.2672 2.72976 17.0669 2.8636 16.8982 3.03233V3.03233Z"
            stroke="#6E6893" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M18.0394 14.2648V17.206C18.0394 17.726 17.8328 18.2248 17.4651 18.5925C17.0973 18.9602 16.5986 19.1668 16.0786 19.1668H5.29415C4.77411 19.1668 4.27537 18.9602 3.90765 18.5925C3.53993 18.2248 3.33334 17.726 3.33334 17.206V6.42157C3.33334 5.90154 3.53993 5.4028 3.90765 5.03508C4.27537 4.66735 4.77411 4.46077 5.29415 4.46077H8.23535"
            stroke="#6E6893" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button class="table__btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20"
          height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M7.03125 3.59375H6.875C6.96094 3.59375 7.03125 3.52344 7.03125 3.4375V3.59375H12.9688V3.4375C12.9688 3.52344 13.0391 3.59375 13.125 3.59375H12.9688V5H14.375V3.4375C14.375 2.74805 13.8145 2.1875 13.125 2.1875H6.875C6.18555 2.1875 5.625 2.74805 5.625 3.4375V5H7.03125V3.59375ZM16.875 5H3.125C2.7793 5 2.5 5.2793 2.5 5.625V6.25C2.5 6.33594 2.57031 6.40625 2.65625 6.40625H3.83594L4.31836 16.6211C4.34961 17.2871 4.90039 17.8125 5.56641 17.8125H14.4336C15.1016 17.8125 15.6504 17.2891 15.6816 16.6211L16.1641 6.40625H17.3438C17.4297 6.40625 17.5 6.33594 17.5 6.25V5.625C17.5 5.2793 17.2207 5 16.875 5ZM14.2832 16.4062H5.7168L5.24414 6.40625H14.7559L14.2832 16.4062Z"
            fill="#6E6893" />
        </svg>
      </button>
    </td>
  `,
  );

  return tr;
};

const renderGoods = (arrObj) => {
  const table = document.querySelector('.table__body');
  const rows = arrObj.map(createRows);
  table.append(...rows);

  return table;
};

renderGoods(goods);
