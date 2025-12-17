import { addProducts, cart, loadCart } from "../../data/cart.js";


describe('test suite: Cart.js', () => {

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

    spyOn(localStorage, 'setItem');

    loadCart();

    addProducts('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(2);
    expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[1].quantity).toEqual(3)
  });

  it('addition of product to cart', () => {

    // mocks: dummies for the actual function
    // avoids adding/removing values in real storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    spyOn(localStorage, 'setItem');

    // Cart is loaded after creating mocks
    loadCart();
    addProducts("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    //All the expect cases has to pass for this this test case to pass
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});

