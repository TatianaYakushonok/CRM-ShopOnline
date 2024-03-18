import constant, { URL } from './modules/constant.js';
const { form, btnGoods, modal, totalSum, formTotalSum } = constant;
import { renderGoods } from './modules/render.js';
import control, { openGoodsPic } from './modules/control.js';
import { fetchRequest, getDataGoods } from './modules/fetchRequest.js';
import { createRows } from './modules/createRows.js';
const {
  calculateTotalSum,
  removeRow,
  modalControl,
  formControl,
  discountControl,
  addTotalSum,
  calculateFormTotalSum,
} = control;

const init = async () => {
  const table = document.querySelector('.table__body');
  fetchRequest(URL, {
    callback: createRows,
  });

  const { goods } = await getDataGoods(URL);
  const totalPrice = calculateTotalSum(goods);
  removeRow(goods, totalPrice, table, totalSum, formTotalSum);
  openGoodsPic(table);

  const { closeModal } = modalControl(btnGoods, modal);
  formControl(
    goods,
    totalPrice,
    form,
    table,
    closeModal,
    totalSum,
    formTotalSum,
  );
  discountControl(form);
  addTotalSum(totalPrice, totalSum, formTotalSum);
  calculateFormTotalSum(totalPrice, form, totalSum, formTotalSum);
};

init();
