export let cart;

loadCart();

export function loadCart(){
  cart = JSON.parse(localStorage.getItem('cart')) ?? [
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

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addProducts(productId, quantity){
  let matchingItem = getMathcingItem(productId);

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeProduct(productId){
  let newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) newCart.push(cartItem);
  });

  // Alternative
  //let newCart = cart.filter(cartItem => cartItem.productId !== productId);

  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem = getMathcingItem(productId);

  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveToStorage();
}


export function getCartQuantity(){

  let cart_quantity = 0;

  cart.forEach((cartItem) => {
    cart_quantity += cartItem.quantity;
  });

  return cart_quantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem = getMathcingItem(productId);

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

function getMathcingItem(productId){
  let matchingItem;

  cart.forEach((item) => {
    if(item.productId === productId){
      matchingItem = item;
    }
  });

  return matchingItem;
}

export function getCartItemQuantity(productId){
  return getMathcingItem(productId).quantity;
}
