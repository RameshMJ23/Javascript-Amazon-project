// Required data is exported from respective files and can be imported

import {cart, addProducts, getCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML  = '';

updateCartQuantity();

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src=${product.getRatingStars()}>
        <div class="product-rating-count link-primary">
          56
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>
      ${product.getExtraInfo()}
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      

      <!-- Data attributes are useful in passing the data through HTML elements -->
      <!-- Its useful when we declare its logic in a separate js instead of its 'onclick' attribute -->
      <!-- Syntax: starts with 'data' and changes from kebab -> camelCase while fetching -->

      <button class="add-to-cart-button button-primary js-add-to-cart-button"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


function updateCartQuantity(){
  let cart_quantity = getCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cart_quantity;
}


document.querySelector('.js-product-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((addButton) => {

    let intervalId;

    addButton.addEventListener('click', () => {
      const {productId} = addButton.dataset;

      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

      const quantity = Number(quantitySelector.value);

      console.log(quantity);
      console.log(typeof quantity);

      document.querySelector(`.js-added-to-cart-${productId}`)
        .classList.add('added-to-cart-visible');

      if(intervalId)
        clearInterval(intervalId);

      intervalId = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`)
          .classList.remove('added-to-cart-visible');
      }, 2000);

      addProducts(productId, quantity);      
      updateCartQuantity();
    })
  });