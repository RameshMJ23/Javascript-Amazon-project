import {formatCurrency} from '../script/utils/money.js';

// test suite
console.log('test: formatCurrency');

// test cases
// nomral case
console.log('converts cents into dollar')
if(formatCurrency(2095) === '20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

// Edge cases
console.log('works with 0')
if(formatCurrency(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works with decimal values')
if(formatCurrency(2000.5) === '20.01'){
  console.log('passed');
}else{
  console.log('failed');
}