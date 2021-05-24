import { Product } from "./product";
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
    this.product = product;
    this.signedDate = signedDate;
    this.revenue = 0; // TODO
    this.revenueRecognitions = []; // TODO
  }
}