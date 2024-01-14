import goods from '../goods.json' assert { type: 'json' };
import { createRows } from './createRows.js';

const removeGoodData = (id) => {
  const index = goods.findIndex((item) => item.id.toString() === id);
  if (index !== -1) {
    goods.splice(index, 1);
  }
};

const removeRow = (totalPrice, table, totalSum, formTotalSum) => {
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const id = target.closest('.table__row').dataset.id;
      target.closest('.table__row').remove();
      removeGoodData(id);
      totalPrice = calculateTotalSum(goods);
      addTotalSum(totalPrice, totalSum, formTotalSum);
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

const addGoodData = (totalPrice, newGood, totalSum, formTotalSum) => {
  goods.push(newGood);
  addTotalSum(totalPrice, totalSum, formTotalSum);
};

const addGoodPage = (newGood, table) => {
  const newRow = createRows(newGood);
  table.append(newRow);
};

const formControl = (
  totalPrice,
  form,
  table,
  closeModal,
  totalSum,
  formTotalSum,
) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoods = Object.fromEntries(formData);
    /*const id = goods.length;
    newGoods[id] = id;
    console.log(newGoods[id]);*/
    addGoodData(totalPrice, newGoods, totalSum, formTotalSum);
    addGoodPage(newGoods, table);
    totalPrice = calculateTotalSum(goods);
    addTotalSum(totalPrice, totalSum, formTotalSum);

    form.reset();
    closeModal();
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
