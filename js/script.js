// Модуль 4 урок 1
{
  const nameGoods = 'Телевизор DEXP';
  const amount = 15;
  const category = 'Техника для дома';
  const price = 1000;
  const totalPrice = amount * price;

  console.group('Модуль 4 урок 1');
  console.log('Товар: ' + nameGoods);
  console.log('Общая стоимость: ' + totalPrice);
  console.groupEnd();
}

// Модуль 4 урок 2
{
  const nameGoods = prompt('Введите наименование товара');
  const category = prompt('Введите категорию товара');
  const amount = parseInt(prompt('Введите количество товара'));
  const price = parseInt(prompt('Введите цену товара'));

  if (!isNaN(amount) && !isNaN(price)) {
    const totalPrice = amount * price;

    console.group('Модуль 4 урок 2');
    console.log(typeof amount);
    console.log(typeof price);
    console.log(`На складе ${amount} единицы товара "${nameGoods}" на сумму ${totalPrice.toLocaleString()} ₽`);
    console.groupEnd();
  } else {
    console.group('Модуль 4 урок 2');
    console.log('Вы ввели некорректные данные! Введите число');
    console.groupEnd();
  }
}
