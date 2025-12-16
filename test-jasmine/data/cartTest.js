import { addProducts, cart, loadCart } from "../../data/cart.js";


describe('test suite: Cart.js', () => {
  it('addition of product to cart', () => {

    // mocks: dummies for the actual function
    // avoids adding/removing values in real storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    spyOn(localStorage, 'setItem');

    // Cart is loaded after creating mocks
    loadCart();

    console.log(cart);
    addProducts("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    //All the expect cases has to pass for this this test case to pass
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});

