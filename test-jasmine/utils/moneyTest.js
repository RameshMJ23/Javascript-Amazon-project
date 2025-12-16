import {formatCurrency} from '../../script/utils/money.js';

// test suite
describe("test: formatCurrency", () => {

  // test cases
  it('converts cents into dollar', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('works with decimal values', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
})