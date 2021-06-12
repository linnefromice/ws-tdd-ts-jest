import { Sanshiro } from "../sanshiro"

describe('三四郎', () => {
  const product = new Sanshiro();
  test('の名前は"三四郎"である', () => {
    expect("三四郎").toEqual(product.name);
  });
  test('のカテゴリは"スプレッドシート"である', () => {
    expect("スプレッドシート").toEqual(product.category);
  });
  test('の価格は"5000"である', () => {
    expect(5000).toEqual(product.price);
  });
});
