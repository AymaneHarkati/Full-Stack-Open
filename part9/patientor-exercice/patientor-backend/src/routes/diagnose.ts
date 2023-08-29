import express from "express";

const router = express.Router();

router.get("/diagnose", (_req, res) => {
  res.send("all diagnose");
});

router.post("/diagnose", (_req, res) => {
  res.send("added a diagnose");
});

export default router;
