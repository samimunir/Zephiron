import cloundinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // find all products

    return res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts() controller:", error.message);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found." });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    return res.json({ featuredProducts });
  } catch (error) {
    console.log("Error in getFeaturedProducts() controller:", error.message);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloundinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.log("Error in createProduct() controller:", error.message);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
