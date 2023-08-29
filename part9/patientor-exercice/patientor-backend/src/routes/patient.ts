import express from "express";
import patientServices from "../services/patientServices";

import { toNewPatient } from "../utils";
const router = express.Router();

router.get("/patients", (_req, resp) => {
  resp.send(patientServices.getAll());
});

router.post("/patients", (req, resp) => {
  const newPatient = toNewPatient(req.body);
  const allPatient = patientServices.addPatient(newPatient);
  resp.send(allPatient);
});

export default router;
