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
  let amount = parseInt(prompt('Введите количество товара'));

  if (!isNaN(amount)) {
    alert('Все верно. Вы ввели количество числом!');
  } else {
    alert('Вы ввели количество не числом! Введите число');
    amount = parseInt(prompt('Введите количество товара'));
  }

  const category = prompt('Введите категорию товара');
  let price = parseInt(prompt('Введите цену товара'));

  if (!isNaN(price)) {
    alert('Все верно. Вы ввели цену числом!');
  } else {
    alert('Вы ввели цену не числом! Введите число');
    price = parseInt(prompt('Введите цену товара'));
  }

  const totalPrice = amount * price;

  console.group('Модуль 4 урок 2');
  console.log(typeof amount);
  console.log(typeof price);
  console.log(`На складе ${amount} единицы товара "${nameGoods}" на сумму ${totalPrice.toLocaleString()} ₽`);
  console.groupEnd();
}
