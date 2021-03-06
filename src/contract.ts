import { Category, Product } from "./product";
import { RevenueRecognition } from "./revenue_recognition"

export type ContractType = {
  product: Product;
  signedDate: string;
}
export class Contract {
  products: Product[] = [];
  signedDate?: string;
  revenue: number = 0;
  revenueRecognitions: RevenueRecognition[] = []

  constructor({product}: Pick<ContractType, "product">) {
    this.purchase({product});
  }

  purchase({product}: Pick<ContractType, "product">) {
    this.products.push(product)
    this.revenue = this.revenue + product.price;
  }

  signed({signedDate}: {signedDate: string}): RevenueRecognition[] {
    this.validateSignedDate(signedDate);
    this.signedDate = signedDate;
    for (const product of this.products) {
      this.generateRevenueRecognitions(product);
    }
    return this.revenueRecognitions;
  }

  checkTotalAmount(): boolean {
    const amounts = this.revenueRecognitions.reduce((sum, model) => sum + model.amount, 0)
    return this.revenue === amounts;
  }

  private generateRevenueRecognitions(product: Product) {
    if (this.signedDate == null) {
      throw new Error("契約日が入力されていません");
    }
    // 1製品に対しそれぞれ契約認識を作る
    // 同日付だとしても別データ
    switch(product.category) {
      case Category.WordProcessor:
        this.revenueRecognitions = [
          ...this.revenueRecognitions,
          new RevenueRecognition({
            date: this.signedDate,
            amount: this.products[0].price // dummy
          })
        ];
        break;
      case Category.SpreadSheet:
        const firstPrice = Math.ceil(this.products[0].price * 2/3); // dummy
        this.revenueRecognitions = [
          ...this.revenueRecognitions,
          new RevenueRecognition({
            date: this.signedDate,
            amount: firstPrice
          }),
          new RevenueRecognition({
            date: this.proceedDays(this.signedDate, 30),
            amount: this.products[0].price - firstPrice // dummy
          })
        ];
        break;
      default:
        this.revenueRecognitions = [];
        break;
    }
  }

  private proceedDays(baseDate: string, days: number): string {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().substr(0, 10);
  }

  private validateSignedDate(signedDate: string) {
    const errorMessage = "SignedDateの形式が不正です";
    const arrays = signedDate.split("-");
    if (arrays.length !== 3) throw new Error(errorMessage);
    const [yyyy, mm, dd] = arrays;
    if (yyyy.length !== 4 || isNaN(parseInt(yyyy))) throw new Error(errorMessage);
    if (mm.length !== 2 || isNaN(parseInt(mm))) throw new Error(errorMessage);
    if (dd.length !== 2 || isNaN(parseInt(dd))) throw new Error(errorMessage);
  }
}
