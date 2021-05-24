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
