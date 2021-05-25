import { Category, Product } from "./product";
import { RevenueRecognition } from "./revenue_recognition"

export type ContractType = {
  product: Product;
  signedDate: string; // YYYYMMDD
  revenue: number;
  revenueRecognitions: RevenueRecognition[]
}
export class Contract {
  product: Product;
  signedDate: string; // YYYYMMDD
  revenue: number;
  revenueRecognitions: RevenueRecognition[]

  constructor({product, signedDate}: Pick<ContractType, "product" | "signedDate">) {
    // this.purchase({product, signedDate});
    this.product = product;
    this.signedDate = signedDate;
    this.revenue = product.price;
    this.revenueRecognitions = [];
    this.generateRevenueRecognitions(product);
  }

  private generateRevenueRecognitions(product: Product) {
    switch(product.category) {
      case Category.WordProcessor:
        this.revenueRecognitions = [
          new RevenueRecognition({
            date: this.signedDate,
            amount: this.product.price
          })
        ];
        break;
      case Category.SpreadSheet:
        
        this.revenueRecognitions = [
          new RevenueRecognition({
            date: this.signedDate,
            amount: this.product.price * 2/3
          }),
          new RevenueRecognition({
            date: this.proceedDays(this.signedDate, 30),
            amount: this.product.price * 1/3
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

  signed(): RevenueRecognition[] {
    return this.revenueRecognitions;
  }

  validate(): boolean {
    const amounts = this.revenueRecognitions.reduce((sum, model) => sum + model.amount, 0)
    return this.revenue === amounts;
  }

/*
  // 配列化対応用
  purchase({product, signedDate}: Pick<ContractType, "product" | "signedDate">) {
    this.product = product; // TODO: 配列にしたい
    this.signedDate = signedDate; // TODO: YYYYMMDD以外弾きたい
    this.revenue = product.price;
    this.revenueRecognitions = []; // TODO
  }
*/
}