import { WordProcessorProduct } from "./product";

export class Ichitaro extends WordProcessorProduct {
  constructor() {
    super({
      name: "一太郎",
      price: 20000
    })
  }
}
