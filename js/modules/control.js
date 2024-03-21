import { URL } from './constant.js';
import { createRows } from './createRows.js';
import { fetchRequest } from './fetchRequest.js';

const removeGoodData = (data, id) => {
  const index = data.findIndex((item) => item.id.toString() === id);
  if (index !== -1) {
    data.splice(index, 1);
  }
};

const removeRow = (data, totalPrice, table, totalSum, formTotalSum) => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const id = target.closest('.table__row').dataset.id;
      target.closest('.table__row').remove();
      calculateTotalSum(data);
      addTotalSum(totalPrice, totalSum, formTotalSum);
    }
  });
};

export const openGoodsPic = (table) => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      const pic = target.closest('.table__row').dataset.pic;
      const topWin = (screen.height - 600) / 2;
      const leftWin = (screen.width - 600) / 2;
      const win =
        pic !== 'image/notimage.jpg'
          ? open(
              'about:blank',
              '',
              `width=600,height=600,top=${topWin},left=${leftWin}`,
            )
          : false;
      if (win)
        win.document.body.innerHTML = `
        <img src=${pic} alt=''>
      `;
    }
  });
};

const modalControl = (btnGoods, modal) => {
  const openModal = () => {
    modal.classList.add('modal__open');
  };

  const closeModal = () => {
    modal.classList.remove('modal__open');
  };

  btnGoods.addEventListener('click', openModal);

  modal.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.form__btn_close') || target === modal) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const createModalError = () => {
  const modalErr = document.createElement('div');
  modalErr.classList.add('modal__error');
  modalErr.insertAdjacentHTML(
    'beforeend',
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="94" height="94"
      viewBox="0 0 94 94" fill="none">
      <path d="M2 2L92 92" stroke="#D80101" stroke-width="3"
        stroke-linecap="round" />
      <path d="M2 92L92 2" stroke="#D80101" stroke-width="3"
        stroke-linecap="round" />
    </svg>
    <p class="modal__error-message">Что-то пошло не так...</p>
    <button class="modal__error_close" type="button"></button>
    `,
  );

  document.body.append(modalErr);
};

const createModalMessage = (nameProduct) => {
  const modalMessage = document.createElement('div');
  modalMessage.classList.add('modal__message');
  modalMessage.insertAdjacentHTML(
    'beforeend',
    `
    <p class="modal__message-text">Товар ${nameProduct} успешно добавлен</p>
    <button class="modal__error_close" type="button"></button>
    `,
  );

  document.body.append(modalMessage);
};

const modalMessageControl = (err, modal) => {
  const modalMessage = document.querySelector(modal);

  const openModal = () => {
    modalMessage.classList.add('modal__error-open');
  };

  const closeModal = () => {
    modalMessage.classList.remove('modal__error-open');
  };

  if (err || modalMessage.classList.contains('modal__message')) {
    openModal();
  }

  modalMessage.addEventListener('click', ({ target }) => {
    if (target.closest('.modal__error_close')) {
      closeModal();
    }
  });
};

const addGoodData = (data, totalPrice, newGood, totalSum, formTotalSum) => {
  data.push(newGood);
  addTotalSum(totalPrice, totalSum, formTotalSum);
};

const addGoodPage = (newGood, table) => {
  const newRow = createRows(newGood);
  table.append(newRow);
};

const formControl = (
  data,
  totalPrice,
  form,
  table,
  closeModal,
  totalSum,
  formTotalSum,
) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newGoods = Object.fromEntries(formData);
    fetchRequest(URL, {
      method: 'POST',
      body: newGoods,
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          createModalError();
          modalMessageControl(err, '.modal__error');
        }
        createModalMessage(data.title);
        modalMessageControl(null, '.modal__message');
        addGoodPage(data, table);
        form.reset();
        closeModal();
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    addGoodData(data, totalPrice, newGoods, totalSum, formTotalSum);
    totalPrice = calculateTotalSum(data);
    addTotalSum(totalPrice, totalSum, formTotalSum);
  });
  addTotalSum(totalPrice, totalSum, formTotalSum);
};

const calculateFormTotalSum = (totalPrice, form, totalSum, formTotalSum) => {
  const formTotalPrice = form.elements.price;
  const formTotalCount = form.elements.count;

  formTotalPrice.addEventListener('blur', () => {
    totalPrice += +formTotalPrice.value * +formTotalCount.value;
    addTotalSum(totalPrice, totalSum, formTotalSum);
  });
};

const discountControl = (form) => {
  const checkDiscount = form.elements.discount[0];
  const discount = form.elements.discount[1];

  form.addEventListener('change', () => {
    if (checkDiscount.checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
    }
  });
};

const calculateTotalSum = (obj) => {
  const totalPrice = obj.reduce(
    (acc, item) => (acc += item.price * item.count),
    0,
  );

  return totalPrice;
};

const addTotalSum = (totalPrice, totalSum, formTotalSum) => {
  totalSum.textContent = `$${totalPrice.toLocaleString('en', {
    minimumFractionDigits: 2,
  })}`;
  formTotalSum.textContent = totalSum.textContent;
};

export default {
  removeGoodData,
  removeRow,
  modalControl,
  addGoodData,
  addGoodPage,
  formControl,
  calculateFormTotalSum,
  discountControl,
  calculateTotalSum,
  addTotalSum,
};
