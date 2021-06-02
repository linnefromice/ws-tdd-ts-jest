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
    {product = new MSWord()}
  ): Contract => new Contract({product: product});

  return {
    createProduct: createProduct,
    createContract: createContract
  }
}
describe('契約モデル', () => {
  describe("は製品を保有する", () => {
    test.each([
      ["MS Word", new MSWord()],
      ["MS Excel", new MSExcel()],
      ["一太郎", new Ichitaro()],
      ["三四郎", new Sanshiro()],
    ])('%sを購入した場合、一つ目のContract.product = "%s" となること', (name, product) => {
      const contract = useFactory().createContract({product});
      expect(name).toEqual(contract.products[0].name);
    });
    test.each([2, 3, 10])(' 複数個購入が可能である: %s個の場合', (number) => {
      const products = [...Array(number - 1)].map((_, i) => useFactory().createProduct({name: `name ${i+2}`}))
      const contract = useFactory().createContract({product: useFactory().createProduct({name: `name 1`})});
      for (const product of products) {
        contract.purchase({product});
      }
      [...Array(number)].forEach((_, i) => {
        expect(contract.products[i].name).toEqual(`name ${i+1}`);
      });
    });
  });
  describe("は契約日を保有する", () => {
    test.each`
      signedDate | description
      ${"1970-01-01"} | ${"過去日"}
      ${"2021-05-21"} | ${"現在日"}
      ${"2099-12-31"} | ${"未来日"}
    `('契約日が$descriptionである"%signedDate"の場合は、"%signedDate"を返却する', ({signedDate}) => {
      const contract = useFactory().createContract({});
      contract.signed({signedDate})
      expect(signedDate).toEqual(contract.signedDate);
    });
    describe("契約日の形式が不正な場合は、errorとなる", () => {
      test.each`
        signedDate | format
        ${"19700101"} | ${"YYYYMMDD"}
        ${"1970/01/01"} | ${"YYYY/MM/DD"}
        ${"70-01-01"} | ${"YYYY -> YY"}
        ${"1970-1-01"} | ${"MM -> M"}
        ${"1970-01-001"} | ${"DD -> DDD"}
      `(' 形式:$format', ({signedDate}) => {
        const contract = useFactory().createContract({});
        expect(() => {
          contract.signed({signedDate})
        }).toThrowError(/SignedDate/);
      });
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
    describe('複数個購入した場合は、売上が合計値であること', () => {
      test.each`
        product | price | number | revenue
        ${new MSWord()} | ${new MSWord().price} | ${2} | ${37600}
        ${new MSExcel()} | ${new MSExcel().price} | ${5} | ${139000}
      `("$price x $number = $revenue となること", ({product, number, revenue}) => {
        const contract = useFactory().createContract({product});
        [...Array(number - 1)].forEach((_, i) => {
          contract.purchase({product})
        });
        expect(revenue).toEqual(contract.revenue);
      });
    });
  });
  describe("が契約成立をしたら、収益認識を返却する", () => {
    describe('プロダクト1つであり', () => {
      describe('ワードプロセッサの場合、', () => {
        const product = new MSWord();
        test("収益認識を1件返すこと", () => {
          const contract = useFactory().createContract({product});
          expect(1).toEqual(contract.signed({signedDate: "1970-01-01"}).length);
        });
        test("収益認識の日付が、契約日当日であること", () => {
          const signedDate = "1970-01-01"
          const contract = useFactory().createContract({product});
          expect(signedDate).toEqual(contract.signed({signedDate: "1970-01-01"})[0].date);
        });
        test("収益認識の売上が、製品価格の全額であること", () => {
          const contract = useFactory().createContract({product});
          expect(product.price).toEqual(contract.signed({signedDate: "1970-01-01"})[0].amount);
        });
      });
      describe("スプレッドシートの場合、", () => {
        const product = new MSExcel();
        const signedDate = "1970-01-01";
        const contract = useFactory().createContract({product});
        const results = contract.signed({signedDate});
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
    });
    describe("複数プロダクトであり、", () => {
      test.each([2, 3, 10])('カテゴリ”ワードプロセッサ”1000円%s個の場合', (number) => {
        const category = Category.WordProcessor;
        const price = 1000;
        const product = useFactory().createProduct({category, price});
        const contract = useFactory().createContract({product});
        const products = [...Array(number - 1)].map((_, i) => useFactory().createProduct({name: `name ${i+2}`}))
        for (const product of products) {
          contract.purchase({product});
        }
        const revenueRecognitions = contract.signed({signedDate: "1970-01-01"});
        expect(number).toEqual(revenueRecognitions.length);
        expect(number).toEqual(revenueRecognitions.filter(rec => rec.amount === 1000).length);
      });
    });
    describe("収益認識の総和は売り上げと完全一致する", () => {
      test('カテゴリ"ワードプロセッサ"の場合', () => {
        const category = Category.WordProcessor;
        const price = 10000;
        const product = useFactory().createProduct({category, price});
        const contract = useFactory().createContract({product});
        expect(product.price).toEqual(contract.signed({signedDate: "1970-01-01"}).reduce((prev, current) => prev + current.amount, 0));
      });
      describe('カテゴリ"スプレッドシート"であり、', () => {
        const category = Category.SpreadSheet;
        test('製品価格が割り切れる場合', () => {
          const price = 10000;
          const product = useFactory().createProduct({category, price});
          const contract = useFactory().createContract({product});
          expect(product.price).toEqual(contract.signed({signedDate: "1970-01-01"}).reduce((prev, current) => prev + current.amount, 0));
        });
        test('製品価格が割り切れない場合', () => {
          const price = 10001;
          const product = useFactory().createProduct({category, price});
          const contract = useFactory().createContract({product});
          expect(product.price).toEqual(contract.signed({signedDate: "1970-01-01"}).reduce((prev, current) => prev + current.amount, 0));
        });
      });
    });
    describe("製品", () => {
      test("MS Excelの場合", () => {
        const product = new MSExcel();
        const contract = useFactory().createContract({product});
        const results = contract.signed({signedDate: "2021-05-24"});
        expect(18534).toEqual(results[0].amount);
        expect("2021-05-24").toEqual(results[0].date);
        expect(9266).toEqual(results[1].amount);
        expect("2021-06-23").toEqual(results[1].date);
      });
      test("三四郎の場合", () => {
        const product = new Sanshiro();
        const contract = useFactory().createContract({product});
        const results = contract.signed({signedDate: "2021-05-24"});
        expect(3334).toEqual(results[0].amount);
        expect("2021-05-24").toEqual(results[0].date);
        expect(1666).toEqual(results[1].amount);
        expect("2021-06-23").toEqual(results[1].date);
      });
    });
  });
});