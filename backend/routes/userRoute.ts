import express from "express";
import { Request, Response } from "express";
import userModel from "../models/userModel";

const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.get("/users/:userid", async (req: Request, res: Response) => {
  const { userid } = req.params;
  try {
    const user = await userModel.findById(userid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

userRouter.post("/users", async (req: Request, res: Response) => {
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

    const user = await userModel.create(newUser);
    return res.status(201).send(user);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

userRouter.put("/users/:userid", async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: username, email, password",
      });
    }

    const { userid } = req.params;

    const result = await userModel.findByIdAndUpdate(userid, req.body);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send({ message: "User updated succesfully" });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

userRouter.delete("/users/:userid", async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    const result = await userModel.findByIdAndDelete(userid);

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).send({ message: "User deleted succesfully" });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

export default userRouter;
