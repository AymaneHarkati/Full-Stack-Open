import express from "express";
import diagnoseRouter from "./src/routes/diagnose";
import patientRouter from "./src/routes/patient";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});
app.use("/api/", diagnoseRouter, patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
