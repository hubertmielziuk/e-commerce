import express from "express";
import { Request, Response } from "express";
import productModel from "../models/productModel";

const productRouter = express.Router();

productRouter.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Server error, check console" });
  }
});

productRouter.get(
  "/products/:productid",
  async (req: Request, res: Response) => {
    const { productid } = req.params;
    try {
      const product = await productModel.findById(productid);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

productRouter.post("/products", async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.price) {
      return res
        .status(400)
        .send({ message: "Send all required fields: name, price" });
    }

    const newProduct = {
      name: req.body.name,
      price: req.body.price,
    };
    const product = await productModel.create(newProduct);
    return res.status(201).send(product);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

productRouter.put(
  "/products/:productid",
  async (req: Request, res: Response) => {
    try {
      if (!req.body.name || !req.body.price) {
        return res
          .status(400)
          .send({ message: "Send all required fields: name, price" });
      }

      const { id } = req.params;

      const result = await productModel.findByIdAndUpdate(id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).send({ message: "Product updated succesfully" });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  }
);

productRouter.delete(
  "/products/:productid",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = await productModel.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).send({ message: "Product deleted succesfully" });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Internal server error", error: error.message });
    }
  }
);

export default productRouter;
