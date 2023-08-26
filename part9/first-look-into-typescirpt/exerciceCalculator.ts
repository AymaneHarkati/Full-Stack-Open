interface returnType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface argsPassed {
  hoursPerDay: Array<number>;
  target: number;
}

const processArg = (args: string[]): argsPassed => {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");
  const arr = args.filter((v) => !isNaN(Number(v)));
  console.log(arr);
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      hoursPerDay: arr.slice(0, arr.length - 1).flatMap((val) => Number(val)),
      target: Number(arr.at(arr.length - 1)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const exCalc = (hoursPerDay: Array<number>, target: number): returnType => {
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
try {
  const { hoursPerDay, target } = processArg(process.argv);
  console.log(exCalc(hoursPerDay, target));
} catch (error: unknown) {
  let errorMessage = "Error occured. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
