// Named export
import {cart, removeProduct, updateDeliveryOption, getCartQuantity, updateQuantity, getCartItemQuantity} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/delivery-options.js';

// default export
// esm = ecmajavascript, these files have functions that are exportable, else use link in script

import { renderPaymentSummary} from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary(){

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const matchingProduct = getProduct(cartItem.productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const deliveryDate = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container jst-cart-item-container
       jst-cart-item-container-${matchingProduct.id} js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">
                  ${cartItem.quantity}
                </span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
                data-product-id = "${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id = "${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link jst-delete-link-${matchingProduct.id}"
                data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${generateDeliveryOptions(matchingProduct, cartItem)}
          </div>        
        </div>
      </div>
    `;
  });

  function generateDeliveryOptions(matchingProduct, cartItem){

    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {

      const deliveryDate = calculateDeliveryDate(deliveryOption);

      const price = deliveryOption.priceCents === 0 
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id 
        ? 'checked' 
        : '';

      deliveryOptionsHTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id=${cartItem.productId} data-delivery-option-id=${deliveryOption.id}>
          <input type="radio"
            ${isChecked} 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${price} Shipping
            </div>
          </div>
        </div>
      ` 
    });
    
    return deliveryOptionsHTML;
  } 

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach(deleteLink => {
      const productId = deleteLink.dataset.productId; 
      deleteLink.addEventListener('click', () => {
        removeProduct(productId);

        const container = document.querySelector
          (`.js-cart-item-container-${productId}`);

        container.remove();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      const {productId, deliveryOptionId} = option.dataset;

      option.addEventListener('click', () =>{
        updateDeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderPaymentSummary();
      });
  });

  document.querySelectorAll('.js-update-link')
    .forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;

        const cartItemContainerElem = document.querySelector(`.js-cart-item-container-${productId}`);

        cartItemContainerElem.classList.add("is-editing-quantity");

      });
  });

  document.querySelectorAll('.js-save-link')
    .forEach((saveLink) => {
      const productId = saveLink.dataset.productId;
      const inputElem = document.querySelector(`.js-quantity-input-${productId}`);
      const cartItemContainerElem = document.querySelector(`.js-cart-item-container-${productId}`);
      
      saveLink.addEventListener('click', () => {
        handleUpdateQuantity(inputElem, productId, cartItemContainerElem);
      });

      inputElem.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
          handleUpdateQuantity(inputElem, productId, cartItemContainerElem);
        }
      })
  });
}

function handleUpdateQuantity(inputElem, productId, cartItemContainerElem){

  const newQuantity = Number(inputElem.value);

  if(newQuantity >= 1 && newQuantity < 1000){
    updateQuantity(productId, newQuantity);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
    cartItemContainerElem.classList.remove("is-editing-quantity");
  }

  inputElem.value = '';
}

renderOrderSummary();





// 15 HW
// const afterFiveDays = today.add(5, 'days');

// const afterAMonth = today.subtract(1, 'months');

// const someday = dayjs('2025-12-22');

// console.log(isWeekend(someday));

// function isWeekend(someday){

//   const day = someday.format('dddd');

//   if( day === 'Saturday' || day === 'Sunday'){
//     return day;
//   }
// }
