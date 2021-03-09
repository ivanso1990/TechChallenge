import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import { goTo } from '../actions/pageActions';

Given('the user visits {string} page', (page: string) => {
  goTo(page);
});

When('he navigates to cart', () => {
  goTo('cart');
});
