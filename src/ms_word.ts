import { Category, Product } from "./product";

export class MSWord extends Product {
  constructor() {
    super({
      name: "MS Word",
      category: Category.WordProcessor,
      price: 18800
    })
  }
}
