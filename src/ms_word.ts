import { WordProcessorProduct } from "./product";

export class MSWord extends WordProcessorProduct {
  constructor() {
    super({
      name: "MS Word",
      price: 18800
    })
  }
}
