interface returnType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export interface argsPassed {
  hoursPerDay: Array<number>;
  target: number;
}

export const exCalc = (
  hoursPerDay: Array<number>,
  target: number,
): returnType => {
  let trainingDays: number = 0;
  hoursPerDay.map((hours) => (hours !== 0 ? trainingDays++ : trainingDays));
  console.log(trainingDays);
  return {
    periodLength: hoursPerDay.length,
    trainingDays: trainingDays,
    success: trainingDays > target,
    rating: trainingDays > target * 1.5
      ? 3
      : trainingDays < 1.5 && trainingDays >= 1
      ? 2
      : 1,
    ratingDescription: trainingDays === 0
      ? "You need to do better!!!!"
      : "Overall it's always good to train",
    target: target,
    average: hoursPerDay.reduce((a, b) => a + b, 0) / hoursPerDay.length,
  };
};
