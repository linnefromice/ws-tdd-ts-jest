import { Product, Category } from "../product";

function useFactory() {
  const createProduct = (
    {name = "Default Name", category = Category.WordProcessor, price = 0}
  ): Product => new Product({name: name, category: category, price: price});

  return {
    createProduct: createProduct
  }
}

describe('製品モデル', () => {
  describe("は名前を持つ", () => {
    test('名前"製品名XYZ"の製品は、Product#nameで"製品名XYZ"を返す', () => {
      const product = useFactory().createProduct({name: "製品名XYZ"})
      expect("製品名XYZ").toEqual(product.name);
    });
  });
  describe("はカテゴリを持つ", () => {
    test('カテゴリ"ワードプロセッサ"の製品は、Product#categoryで"ワードプロセッサ"を返す', () => {
      const product = useFactory().createProduct({category: Category.WordProcessor})
      expect("ワードプロセッサ").toEqual(product.category);
    });
    test('カテゴリ"スプレッドシート"の製品は、Product#categoryで"スプレッドシート"を返す', () => {
      const product = useFactory().createProduct({category: Category.SpreadSheet})
      expect("スプレッドシート").toEqual(product.category);
    });
    test.skip('カテゴリはワードプロセッサ/スプレッドシート以外は含められない', () => {
      // TODO: PowerPointのパターン
    });
  });
  describe("は価格を持つ", () => {
    test('価格"10,000円"の製品は、Product#priceで"10000"を返す', () => {
      const product = useFactory().createProduct({price: 10000})
      expect(10000).toEqual(product.price);
    });
  });
});

