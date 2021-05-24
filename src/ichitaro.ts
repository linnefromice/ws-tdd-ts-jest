import { Category, Product } from "./product";

export class Ichitaro extends Product {
  constructor() {
    super({
      name: "一太郎",
      category: Category.WordProcessor,
      price: 20000
    })
  }
}
