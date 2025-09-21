import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  ecoFriendly: { type: Boolean, default: false },
  fragile: { type: Boolean, default: false }
});

const ArtisanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  craft: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  languages: { type: [String], default: [] },
  products: { type: [ProductSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Artisan", ArtisanSchema);
