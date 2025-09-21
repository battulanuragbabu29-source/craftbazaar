import express from "express";
import Artisan from "../models/Artisan.js";

const router = express.Router();

// GET all artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.find().sort({ createdAt: -1 });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create artisan
router.post("/", async (req, res) => {
  try {
    const artisan = new Artisan(req.body);
    await artisan.save();
    res.status(201).json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST add product to artisan
router.post("/:id/products", async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ error: "Artisan not found" });
    artisan.products.push(req.body);
    await artisan.save();
    res.json(artisan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
