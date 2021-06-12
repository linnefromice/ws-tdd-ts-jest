import { MSWord } from "../ms_word"

describe('MS Word', () => {
  const product = new MSWord();
  test('の名前は"MS Word"である', () => {
    expect("MS Word").toEqual(product.name);
  });
  test('のカテゴリは"ワードプロセッサ"である', () => {
    expect("ワードプロセッサ").toEqual(product.category);
  });
  test('の価格は"18800"である', () => {
    expect(18800).toEqual(product.price);
  });
});
