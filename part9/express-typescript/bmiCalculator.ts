export const bmiCalc = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height * 0.01, 2);
  if (bmi >= 18.5 && bmi < 25) {
    return "healthy weight";
  } else {
    return "not healthy weight";
  }
};
