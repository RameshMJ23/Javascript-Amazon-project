export const deliveryOptions = [
  {
    id: '1',
    deliveryTime: 7,
    priceCents: 0
  },{
    id: '2',
    deliveryTime: 3,
    priceCents: 499
  },{
    id: '3',
    deliveryTime: 1,
    priceCents: 999
  }

];

export function getDeliveryOption(deliveryId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryId){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
