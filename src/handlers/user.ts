import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { WithId } from "./types";
import { verifyAuthToken } from "./verifyAuthToken";

const store = new UserStore();

// const index = async (_req: Request, res: Response) => {
//   const weapons = await store.index();
//   res.json(weapons);
// };
const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = (await store.create(user)) as WithId<User>;
    const token = jwt.sign(
      { user: { id: newUser.id, username: newUser.username } },
      process.env.TOKEN_SECRET!
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const auth = async (req: Request, res: Response) => {
  try {
    const user = await store.authentication(
      req.body.username,
      req.body.password
    );
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.json(deleted);
};

const user_routes = (app: express.Application) => {
  // app.get("/users", index);
  app.post("/users/create", create);
  app.post("/users/auth", auth);
  app.get("/users/:id", verifyAuthToken, show);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default user_routes;
