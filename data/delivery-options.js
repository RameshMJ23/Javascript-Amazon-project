import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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

  return deliveryOption || null;
}

export function calculateDeliveryDate(deliveryOption){

  const today = dayjs();

  let i = 1;

  let feasibleDeliveryDates = deliveryOption.deliveryTime;

  while(i <= deliveryOption.deliveryTime){

    let checkDate = today.add(i, 'days');

    if(isWeekend(checkDate)){
      feasibleDeliveryDates++;
    }

    i++;
  }

  const deliveryDate = today.add(
      feasibleDeliveryDates, 'days');
    
  return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(someday){
  const day = someday.format('dddd');

  if(day === 'Saturday' || day === 'Sunday'){
    return true;
  }else{
    return false;
  }
}