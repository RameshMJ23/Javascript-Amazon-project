import { products, getProduct} from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary(){

  let paymentHTML = '';
  let totalPriceCents = 0;
  let totalShippingCost = 0;

  cart.forEach(cartItem => {

    const product = getProduct(cartItem.productId);

    totalPriceCents += product.priceCents * cartItem.quantity;

    totalShippingCost += getDeliveryOption(cartItem.deliveryOptionId).priceCents;

  });
  console.log(totalPriceCents);
  console.log(totalShippingCost);
  let beforeTaxCost = totalPriceCents + totalShippingCost;

  let tax = beforeTaxCost * 0.1;

  let finalCost = beforeTaxCost + tax;

  paymentHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalShippingCost)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(beforeTaxCost)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(tax)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(finalCost)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentHTML;
  
}