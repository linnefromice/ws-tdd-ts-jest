import { Contract } from "../contract";
import { MSWord } from "../ms_word";
import { MSExcel } from "../ms_excel";

/*
function useFactory() {
  const createContract = (
    {product = new MSWord(), signedDate = "20210524"}
  ): Product => new Product({name: name, category: category, price: price});

  return {
    createProduct: createProduct
  }
}
*/
describe('契約モデル', () => {
  describe("は製品を一つ保有する", () => {
    test('MS Wordを購入した場合、Contract.product = MSWord となること', () => {
      const product = new MSWord();
      const contract = new Contract({
        product: product,
        signedDate: "20210524"
      });
      expect("MS Word").toEqual(contract.product.name);
    });
    test('MS Excelを購入した場合、Contract.product = MS Excel となること', () => {
        const product = new MSExcel();
        const contract = new Contract({
          product: product,
          signedDate: "20210524"
        });
        expect("MS Excel").toEqual(contract.product.name);
      });
  })
});