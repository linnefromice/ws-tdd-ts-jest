import { MSExcel } from "../ms_excel"

describe('MS Excel', () => {
  const product = new MSExcel();
  test('の名前は"MS Excel"である', () => {
    expect("MS Excel").toEqual(product.name);
  });
  test('のカテゴリは"ワードプロセッサ"である', () => {
    expect("スプレッドシート").toEqual(product.category);
  });
  test('の価格は"27800"である', () => {
    expect(27800).toEqual(product.price);
  });
});
