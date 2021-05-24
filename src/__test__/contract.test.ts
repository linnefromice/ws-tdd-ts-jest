import { Contract } from "../contract";
import { MSWord } from "../ms_word";
import { MSExcel } from "../ms_excel";

function useFactory() {
  const createContract = (
    {product = new MSWord(), signedDate = "20210524"}
  ): Contract => new Contract({product: product, signedDate: signedDate});

  return {
    createContract: createContract
  }
}
describe('契約モデル', () => {
  describe("は製品を一つ保有する", () => {
    test('MS Wordを購入した場合、Contract.product = MSWord となること', () => {
      const contract = useFactory().createContract({product: new MSWord()});
      expect("MS Word").toEqual(contract.product.name);
    });
    test('MS Excelを購入した場合、Contract.product = MS Excel となること', () => {
      const contract = useFactory().createContract({product: new MSExcel()})
      expect("MS Excel").toEqual(contract.product.name);
    });
  })
});