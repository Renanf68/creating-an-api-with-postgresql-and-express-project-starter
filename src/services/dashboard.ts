import Client from "../database";
import { Product } from "../models/product";

export class DashboardQueries {
  async usersWithOrders(): Promise<{ userame: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get users with orders: ${err}`);
    }
  }
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT p.name, r.order_id FROM products p INNER JOIN order_products r ON p.id = r.product_id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products and orders: ${err}`);
    }
  }
  async productsInOrder(
    orderId: string
  ): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT p.name, p.price FROM products p INNER JOIN order_products r ON r.order_id = ($1) AND r.product_id = p.id";
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products to order ${orderId}: ${err}`);
    }
  }
  async fiveMostExpensiveProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT name, price FROM products ORDER BY price DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable get products by price: ${err}`);
    }
  }
}
