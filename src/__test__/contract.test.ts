import { Contract } from "../contract";
import { Category, Product } from "../product";
import { MSWord } from "../ms_word";
import { MSExcel } from "../ms_excel";
import { Ichitaro } from "../ichitaro";
import { Sanshiro } from "../sanshiro";

function useFactory() {
  const createProduct = (
    {name = "Default Name", category = Category.WordProcessor, price = 0}
  ): Product => new Product({name: name, category: category, price: price});

  const createContract = (
    {product = new MSWord(), signedDate = "2021-05-24"}
  ): Contract => new Contract({product: product, signedDate: signedDate});

  return {
    createProduct: createProduct,
    createContract: createContract
  }
}
describe('契約モデル', () => {
  describe("は製品を一つ保有する", () => {
    test.each([
      ["MS Word", new MSWord()],
      ["MS Excel", new MSExcel()],
      ["一太郎", new Ichitaro()],
      ["三四郎", new Sanshiro()],
    ])('%sを購入した場合、Contract.product = "%s" となること', (name, product) => {
      const contract = useFactory().createContract({product});
      expect(name).toEqual(contract.product.name);
    });
  });
  describe("は契約日を保有する", () => {
    test.each`
      signedDate | description
      ${"19700101"} | ${"過去日"}
      ${"20210521"} | ${"現在日"}
      ${"20991231"} | ${"未来日"}
    `('契約日が$descriptionである"%signedDate"の場合は、"%signedDate"を返却する', ({signedDate, description}) => {
      const contract = useFactory().createContract({signedDate});
      expect(signedDate).toEqual(contract.signedDate);
    });
  });
  describe("は売上を返却する", () => {
    test.each`
      product | name | price
      ${new MSWord()} | ${"MS Word"} | ${new MSWord().price}
      ${new MSExcel()} | ${"MS Excel"} | ${new MSExcel().price}
      ${new Ichitaro()} | ${"一太郎"} | ${new Ichitaro().price}
      ${new Sanshiro()} | ${"三四郎"} | ${new Sanshiro().price}
    `("$nameの場合、売上が$priceであること", ({product, price}) => {
      const contract = useFactory().createContract({product});
      expect(price).toEqual(contract.revenue);
    });
  });
  describe("が契約成立をしたら、収益認識を返却する", () => {
    describe('ワードプロセッサの場合、', () => {
      const product = new MSWord();
      test("収益認識を1件返すこと", () => {
        const contract = useFactory().createContract({product});
        expect(1).toEqual(contract.signed().length);
      });
      test("収益認識の日付が、契約日当日であること", () => {
        const signedDate = "1970-01-01"
        const contract = useFactory().createContract({product, signedDate});
        expect(signedDate).toEqual(contract.signed()[0].date);
      });
      test("収益認識の売上が、製品価格の全額であること", () => {
        const contract = useFactory().createContract({product});
        expect(product.price).toEqual(contract.signed()[0].amount);
      });
    });
    describe("スプレッドシートの場合、", () => {
      const product = new MSExcel();
      const signedDate = "1970-01-01";
      const contract = useFactory().createContract({product, signedDate});
      const results = contract.signed();
      test("収益認識を2件返すこと", () => {
        expect(2).toEqual(results.length);
      });
      describe("1件目の収益認識の", () => {
        test("日付が、契約日当日であること", () => {
          expect(signedDate).toEqual(results[0].date);
        });
        test("売上が、製品価格の2/3であること(切上)", () => {
          expect(18534).toEqual(results[0].amount);
        });
      });
      describe("2件目の収益認識の", () => {
        test("日付が、契約日当日であること", () => {
          expect("1970-01-31").toEqual(results[1].date);
        });
        test("日付が、製品価格の1/3であること(切下)", () => {
          expect(9266).toEqual(results[1].amount);
        });
      });
    });
    describe("製品", () => {
      test("MS Excelの場合", () => {
        const product = new MSExcel();
        const contract = useFactory().createContract({product});
        const results = contract.signed();
        expect(18534).toEqual(results[0].amount);
        expect("2021-05-24").toEqual(results[0].date);
        expect(9266).toEqual(results[1].amount);
        expect("2021-06-23").toEqual(results[1].date);
      });
      test("三四郎の場合", () => {
        const product = new Sanshiro();
        const contract = useFactory().createContract({product});
        const results = contract.signed();
        expect(3334).toEqual(results[0].amount);
        expect("2021-05-24").toEqual(results[0].date);
        expect(1666).toEqual(results[1].amount);
        expect("2021-06-23").toEqual(results[1].date);
      });
    });
  });
});