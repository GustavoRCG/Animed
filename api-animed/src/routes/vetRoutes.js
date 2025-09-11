import { Router } from "express";
import { getAllVets } from "../controller/vetController.js";

const router = Router();

// GET /vets
router.get("/", getAllVets);

export default router;
