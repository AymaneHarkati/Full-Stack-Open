import express from "express";
import { bmiCalc } from "./bmiCalculator";
import { exCalc } from "./exerciceCalculator";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

app.get("/ping", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res
      .status(400)
      .send("Both height and weight are required query parameters.");
    return;
  }
  try {
    const height = req.query.height;
    const weight = req.query.weight;
    res.send(bmiCalc(Number(height), Number(weight)));
  } catch (error) {
    res.send({ error });
  }
});

app.post("/calculator", (req, resp) => {
  const { hoursPerDay, target } = req.body;
  if (!hoursPerDay || !target) {
    resp.send({ error: "malformed params or missing value" });
    return;
  }
  const result = exCalc(hoursPerDay, target);

  resp.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
