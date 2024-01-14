import goods from './goods.json' assert { type: 'json' };
import constant from './modules/constant.js';
const { form, btnGoods, modal, totalSum, formTotalSum } = constant;
import { renderGoods } from './modules/render.js';
import control from './modules/control.js';
const {
  calculateTotalSum,
  removeRow,
  modalControl,
  formControl,
  discountControl,
  addTotalSum,
  calculateFormTotalSum,
} = control;

const init = () => {
  const table = renderGoods(goods);
  const totalPrice = calculateTotalSum(goods);

  removeRow(totalPrice, table, totalSum, formTotalSum);

  const { closeModal } = modalControl(btnGoods, modal);
  formControl(totalPrice, form, table, closeModal, totalSum, formTotalSum);
  discountControl(form);
  addTotalSum(totalPrice, totalSum, formTotalSum);
  calculateFormTotalSum(totalPrice, form, totalSum, formTotalSum);
};

init();
