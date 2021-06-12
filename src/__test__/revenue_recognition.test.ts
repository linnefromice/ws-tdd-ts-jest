import { RevenueRecognition } from "../revenue_recognition"

function useFactory() {
  const createRevenueRecognition = (
    {date = "1970-01-01", amount = 0}
  ): RevenueRecognition => new RevenueRecognition({date: date, amount: amount});

  return {
    createRevenueRecognition: createRevenueRecognition
  }
}
describe('収益認識', () => {
  test('は日付を保有する', () => {
    const date = "2021-05-24";
    const revenueRecognition = useFactory().createRevenueRecognition({date});
    expect(date).toEqual(revenueRecognition.date);
  });
  test('は金額を保有する', () => {
    const amount = 10000;
    const revenueRecognition = useFactory().createRevenueRecognition({amount});
    expect(amount).toEqual(revenueRecognition.amount);
  });
});
