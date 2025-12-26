// Use PascalCase for methods that generate objects
// Oop = organie our code with objects that represents real world
// classes = a way to generate those objects 

class Cart{
  // public property
  cartItem;

  // private property
  #localStorageKey;

  // Runs as we create a new object
  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadCart();
    
    // should not return anything
  }
  
  // private method = cannot be accessed outside this class
  #loadCart(){
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) ?? [
      {
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '2'
      }
    ]
  }
  
  saveToStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  addProducts(productId, quantity){
    let matchingItem = this.getMathcingItem(productId);

    if(matchingItem){
      matchingItem.quantity += quantity;
    }else{
      this.cartItem.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeProduct(productId){
    let newCart = [];

    this.cartItem.forEach((cartItem) => {
      if(cartItem.productId !== productId) newCart.push(cartItem);
    });

    // Alternative
    //let newCart = cart.filter(cartItem => cartItem.productId !== productId);

    this.cartItem = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem = this.getMathcingItem(productId);

    matchingItem.deliveryOptionId = deliveryOptionId;
    
    this.saveToStorage();
  }

  getCartQuantity(){
    let cart_quantity = 0;

    this.cartItem.forEach((cartItem) => {
      cart_quantity += cartItem.quantity;
    });

    return cart_quantity;
  }

  updateQuantity(productId, newQuantity){
    let matchingItem = this.getMathcingItem(productId);

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  }

  getMathcingItem(productId){
    let matchingItem;

    this.cartItem.forEach((item) => {
      if(item.productId === productId){
        matchingItem = item;
      }
    });

    return matchingItem;
  }

  getCartItemQuantity(productId){
    return this.getMathcingItem(productId).quantity;
  }

}

const cart = new Cart('cart-Oops');
const businessCart = new Cart('cart-business');

cart.addProducts("bc2847e9-5323-403f-b7cf-57fde044a955", 2);
console.log(cart.cartItem);

console.log(businessCart.cartItem);
console.log(businessCart instanceof Cart);