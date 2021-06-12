export type RevenueRecognitionType = {
  date: string; // YYYYMMDD
  amount: number;
}
export class RevenueRecognition {
  date: string; // YYYYMMDD
  amount: number;

  constructor({date, amount}: RevenueRecognitionType) {
    this.date = date;
    this.amount = amount;
  }
}
