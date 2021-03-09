import { TableDefinition } from 'cucumber';
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  acceptOrderModal,
  addToCart,
  checkAmount,
  checkOrder,
  placeOrder,
  removeFromCart,
  selectCategory,
} from './purchaseActions';

When('he adds the following products to cart:', (products: TableDefinition) => {
  const productsList = products.hashes();

  productsList.forEach((product) => {
    selectCategory(product.category);
    addToCart(product.name);
  });
});

When('he removes the following products from cart:', (products: TableDefinition) => {
  const productsList = products.hashes();

  productsList.forEach((product) => {
    removeFromCart(product.name);
  });
});

When('he confirms the order like:', (products: TableDefinition) => {
  const info = products.hashes();

  placeOrder(info);
});

Then('order has been successfully processed', () => {
  checkOrder();
});

Then('the amount is correctly calculated', () => {
  checkAmount();
});

Then('the order is accepted', () => {
  acceptOrderModal();
});
