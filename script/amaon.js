

let productsHTML  = '';

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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          56
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
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

      <div class="added-to-cart">
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

document.querySelector('.js-product-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((addButton) => {
    addButton.addEventListener('click', () => {
      //console.log(addButton.dataset.productId);
      const productId = addButton.dataset.productId;

      let matchingItem;

      cart.forEach((item) => {
        if(item.productId === productId){
          matchingItem = item;
        }
      });

      if(matchingItem){
        matchingItem.quatity += 1;
      }else{
        cart.push({
          productId,
          quatity: 1
        });
      }
      
      let cart_quantity = 0;

      cart.forEach((item) => {
        cart_quantity += item.quatity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cart_quantity;

      console.log(cart);
    })
  });