import { Category, Product } from "./product";

export class MSExcel extends Product {
  constructor() {
    super({
      name: "MS Excel",
      category: Category.SpreadSheet,
      price: 27800
    })
  }
}
