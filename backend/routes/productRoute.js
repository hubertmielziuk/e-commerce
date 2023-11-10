"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productModel_1 = __importDefault(require("../models/productModel"));
const productRouter = express_1.default.Router();
productRouter.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error, check console" });
    }
}));
productRouter.get("/products/:productid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productid } = req.params;
    try {
        const product = yield productModel_1.default.findById(productid);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
productRouter.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const product = yield productModel_1.default.create(newProduct);
        return res.status(201).send(product);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
productRouter.put("/products/:productid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.name || !req.body.price) {
            return res
                .status(400)
                .send({ message: "Send all required fields: name, price" });
        }
        const { id } = req.params;
        const result = yield productModel_1.default.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product updated succesfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
productRouter.delete("/products/:productid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield productModel_1.default.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product deleted succesfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
exports.default = productRouter;
