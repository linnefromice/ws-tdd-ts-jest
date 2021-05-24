export type ProductType = {
  name: string;
  category: string;
  price: number;
}

export class Product {
  name: string;
  category: string;
  price: number;

  constructor({name, category, price}: ProductType) {
    this.name = name;
    this.category = category;
    this.price = price;
  }
}