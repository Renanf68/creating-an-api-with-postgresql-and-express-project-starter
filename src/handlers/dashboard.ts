import express, { Request, Response } from "express";
import { DashboardQueries } from "../services/dashboard";
import { verifyAuthToken } from "./verifyAuthToken";

const dashboard = new DashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const productsInOrder = async (req: Request, res: Response) => {
  const products = await dashboard.productsInOrder(req.params.id);
  res.json(products);
};

const fiveMostExpensiveProducts = async (_req: Request, res: Response) => {
  const products = await dashboard.fiveMostExpensiveProducts();
  res.json(products);
};

const dashboardRoutes = (app: express.Application) => {
  app.get("/users-with-orders", usersWithOrders);
  app.get("/products_in_orders", verifyAuthToken, productsInOrders);
  app.get("/products_in_order/:id", verifyAuthToken, productsInOrder);
  app.get("/five-most-expensive", fiveMostExpensiveProducts);
};

export default dashboardRoutes;
