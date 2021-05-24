import { RevenueRecognition } from "../revenue_recognition"

describe('収益認識', () => {
  test('は日付を保有する', () => {
    const revenueRecognition = new RevenueRecognition({date: "20210524", amount: 10000});
    expect("20210524").toEqual(revenueRecognition.date);
  });
  test('は金額を保有する', () => {
    const revenueRecognition = new RevenueRecognition({date: "20210524", amount: 10000});
    expect(10000).toEqual(revenueRecognition.amount);
  });
});
