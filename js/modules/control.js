import { createRows } from './createRows.js';

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
      removeGoodData(data, id);
      totalPrice = calculateTotalSum(data);
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
        pic !== ''
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
    const formData = new FormData(e.target);
    const newGoods = Object.fromEntries(formData);
    /*const id = goods.length;
    newGoods[id] = id;
    console.log(newGoods[id]);*/
    addGoodData(data, totalPrice, newGoods, totalSum, formTotalSum);
    addGoodPage(newGoods, table);
    totalPrice = calculateTotalSum(data);
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
