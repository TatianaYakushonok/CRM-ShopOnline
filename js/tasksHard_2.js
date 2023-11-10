// Модуль 4 урок 3

/*===================== Задача 2доп. =======================*/

{
  const amount = parseInt(prompt('Введите сумму заработка'));
  let tax = 0;

  if (amount <= 15000 && amount > 0) {
    tax = amount * 0.13;
  } else {
    tax;
  }

  if (amount > 15000 && amount <= 50000) {
    tax = (amount - 15000) * 0.2;
  }

  if (amount > 50000) {
    tax = (amount - 50000) * 0.3;
  }

  const res = !isNaN(amount) ? `Сумма налога на доход составляет ${tax} ₽` : 'Вы ввели не число. Сумма не может быть расчитана';

  console.group('Модуль 4 урок 3 задача 2доп.');
  console.log(res);
  console.groupEnd();
}
