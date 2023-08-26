interface passedArgs {
  height: number;
  weight: number;
}

const processArgs = (args: string[]): passedArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const bmiCalc = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height * 0.01, 2);
  console.log(bmi);
  if (bmi >= 18.5 && bmi < 25) {
    return "healthy weight";
  } else {
    return "not healthy weight";
  }
};

try {
  const { height, weight } = processArgs(process.argv);
  console.log(bmiCalc(height, weight));
} catch (error: unknown) {
  let errorMessage = "Error occured ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
