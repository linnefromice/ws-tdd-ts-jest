import { SpreadSheetProduct } from "./product";

export class MSExcel extends SpreadSheetProduct {
  constructor() {
    super({
      name: "MS Excel",
      price: 27800
    })
  }
}
