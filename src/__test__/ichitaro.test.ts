import { Ichitaro } from "../ichitaro"

describe('一太郎', () => {
  const product = new Ichitaro();
  test('の名前は"一太郎"である', () => {
    expect("一太郎").toEqual(product.name);
  });
  test('のカテゴリは"ワードプロセッサ"である', () => {
    expect("ワードプロセッサ").toEqual(product.category);
  });
  test('の価格は"20000"である', () => {
    expect(20000).toEqual(product.price);
  });
});
