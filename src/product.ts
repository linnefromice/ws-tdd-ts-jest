// type Category = "ワードプロセッサ" | "スプレッドシート"
export enum Category {
  WordProcessor = "ワードプロセッサ",
  SpreadSheet = "スプレッドシート"
}
export type ProductType = {
  name: string;
  category: Category;
  price: number;
}

export class Product {
  name: string;
  category: Category;
  price: number;

  constructor({name, category, price}: ProductType) {
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

export class WordProcessorProduct extends Product {
  constructor({name, price}: Pick<ProductType, 'name' | 'price'>) {
    super({
      name: name,
      category: Category.WordProcessor,
      price: price
    })
  }
}

export class SpreadSheetProduct extends Product {
  constructor({name, price}: Pick<ProductType, 'name' | 'price'>) {
    super({
      name: name,
      category: Category.SpreadSheet,
      price: price
    })
  }
}
