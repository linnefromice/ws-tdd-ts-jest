import { Category, Product } from "./product";

export class Sanshiro extends Product {
  constructor() {
    super({
      name: "三四郎",
      category: Category.SpreadSheet,
      price: 5000
    })
  }
}
