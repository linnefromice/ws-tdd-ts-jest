import { Contract } from "../contract";
import { MSWord } from "../ms_word";
import { MSExcel } from "../ms_excel";
import { Ichitaro } from "../ichitaro";
import { Sanshiro } from "../sanshiro";

function useFactory() {
  const createContract = (
    {product = new MSWord(), signedDate = "2021-05-24"}
  ): Contract => new Contract({product: product, signedDate: signedDate});

  return {
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
  describe("契約成立をしたら、収益認識を返却する", () => {
    test("ワードプロセッサの場合", () => {
      const product = new MSWord();
      const contract = useFactory().createContract({product});
      const results = contract.signed();
      expect(18800).toEqual(results[0].amount);
      expect("2021-05-24").toEqual(results[0].date);
    });
    test("スプレッドシートの場合", () => {
      const product = new MSExcel();
      const contract = useFactory().createContract({product});
      const results = contract.signed();
      expect(27800 * 2/3).toEqual(results[0].amount);
      expect("2021-05-24").toEqual(results[0].date);
      expect(27800 * 1/3).toEqual(results[1].amount);
      expect("2021-06-23").toEqual(results[1].date);
    });
  });
});