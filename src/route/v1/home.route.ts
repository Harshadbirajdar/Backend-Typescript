import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from server");
});

export default router;
