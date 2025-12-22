import { loadCart, cart} from "../../data/cart.js";
import { renderOrderSummary } from "../../script/checkout/orderSummary.js";


describe('test: OrderSummary', () => {

  const productId1 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadCart();

    document.querySelector(".js-test-container").innerHTML = '';
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-order-summary')
      .innerHTML = '';
    document.querySelector('.js-payment-summary')
      .innerHTML = '';
    document.querySelector('.header-content')
      .innerHTML = '';
  });

  // How it appears
  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.jst-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelectorAll(`.product-quantity`)[0].innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelectorAll(`.product-quantity`)[1].innerText
    ).toContain('Quantity: 2');
  });

  //How it behaves
  it('removes product from cart', () => {
    // clicking delete link
    document.querySelector(`.jst-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.jst-cart-item-container').length
    ).toEqual(1);
    
    expect(
      document.querySelector(`.jst-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.jst-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    
    expect(cart[0].productId).toEqual(productId2);
  });
}); 