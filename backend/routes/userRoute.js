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
const userModel_1 = __importDefault(require("../models/userModel"));
const userRouter = express_1.default.Router();
userRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
userRouter.get("/users/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    try {
        const user = yield userModel_1.default.findById(userid);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
userRouter.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({
                message: "Send all required fields: username, email, password",
            });
        }
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };
        const user = yield userModel_1.default.create(newUser);
        return res.status(201).send(user);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
userRouter.put("/users/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).send({
                message: "Send all required fields: username, email, password",
            });
        }
        const { userid } = req.params;
        const result = yield userModel_1.default.findByIdAndUpdate(userid, req.body);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).send({ message: "User updated succesfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
userRouter.delete("/users/:userid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const result = yield userModel_1.default.findByIdAndDelete(userid);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).send({ message: "User deleted succesfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
}));
exports.default = userRouter;
