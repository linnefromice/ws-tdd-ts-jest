import { Product, ProductType } from "../product";

function useFactory() {
  const createProduct = (
    {name = "Default Name", category = "Default Category", price = 0}
  ): Product => new Product({name: name, category: category, price: price});

  return {
    createProduct: createProduct
  }
}

describe('製品', () => {
  describe("は名前を持つ", () => {
    test('名前"製品名XYZ"の製品は、Product#nameで"製品名XYZ"を返す', () => {
      const product = useFactory().createProduct({name: "製品名XYZ"})
      expect("製品名XYZ").toEqual(product.name);
    });
  });
  describe("はカテゴリを持つ", () => {
    test('カテゴリ"ワードプロセッサ"の製品は、Product#categoryで"ワードプロセッサ"を返す', () => {
      const product = useFactory().createProduct({name: "ワードプロセッサ"})
      expect("ワードプロセッサ").toEqual(product.category);
    });
  });
  describe("はカテゴリを持つ", () => {
    test('価格"10,000円"の製品は、Product#priceで"10000"を返す', () => {
      const product = useFactory().createProduct({price: 10000})
      expect(10000).toEqual(product.price);
    });
  });
});
