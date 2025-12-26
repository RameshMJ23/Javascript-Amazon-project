import { addProducts, cart, loadCart, removeProduct, updateDeliveryOption} from "../../data/cart.js";
import { renderOrderSummary } from "../../script/checkout/orderSummary.js";


describe('test suite: Cart.js', () => {

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adding existing product to cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOptionId: '2'
        }
      ]);
    });

    
    loadCart();

    addProducts('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem)
      .toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3,
        deliveryOptionId: '2'
      }
    ]));
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[1].quantity).toEqual(3)
  });

  it('addition of product to cart', () => {

    // mocks: dummies for the actual function
    // avoids adding/removing values in real storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    
    // Cart is loaded after creating mocks
    loadCart();
    addProducts("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    //All the expect cases has to pass for this this test case to pass
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem)
      .toHaveBeenCalledWith('cart', JSON.stringify([
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ]));
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});

describe("test suite: Cart.js", () => {

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
  });

  it('remove products from cart', () => {
    removeProduct(productId1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it("remove products from cart that doesn't exist already", () => {
    removeProduct("54e0eccd-8f36-462b-b68a-8182611d9add");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(2);
  });
});

describe("test suite: Cart.js", () => {

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
  });

  it('update delivery option', () => {
    updateDeliveryOption(productId1, '3');

    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([
      {
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '3'
      }, {
        productId: productId2,
        quantity: 2,
        deliveryOptionId: '2'
      }
    ]));
  });

  it('update delivery option(non-existing product)', () => {
    updateDeliveryOption("54e0eccd-8f36-462b-b68a-8182611d9add", '3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  
  it('invalid delivery option', () => {
    updateDeliveryOption(productId1, '4');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
