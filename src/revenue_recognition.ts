export type RevenueRecognitionType = {
  date: string; // YYYYMMDD
  amount: string;
}
export class RevenueRecognition {
  date: string; // YYYYMMDD
  amount: string;

  constructor({date, amount}: RevenueRecognitionType) {
    this.date = date;
    this.amount = amount;
  }
}