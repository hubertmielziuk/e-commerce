import express from "express";
import { Request, Response } from "express";
import productModel from "../models/productModel";

const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, check console" });
  }
});

router.get("/products/:productid", async (req: Request, res: Response) => {
  const { productid } = req.params;
  try {
    const product = await productModel.findById(productid);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, check console" });
  }
});

router.post("/products", async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.put("/products/:productid", async (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.delete("/products/:productid", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await productModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

export default router;
