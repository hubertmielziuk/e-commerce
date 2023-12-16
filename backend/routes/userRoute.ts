import express from "express";
import { Request, Response } from "express";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
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
    const user = await UserModel.findById(userid);
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };

    const user = await UserModel.create(newUser);
    return res.status(201).send(user);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

userRouter.patch(
  "/users/:id/change-password",
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

userRouter.put("/users/:userid", async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Send all required fields: username, email, password",
      });
    }

    const { userid } = req.params;

    const result = await UserModel.findByIdAndUpdate(userid, req.body);
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

    const result = await UserModel.findByIdAndDelete(userid);

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
