import bcrypt from "bcrypt";
import Client from "../database";

const saltRounds = process.env.SALT_ROUNDS ?? "0";
const pepper = process.env.PEPPER ?? "";

export interface User {
  username: string;
  password?: string;
  password_digest?: string;
}

export class UserStore {
  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM mythical_weapons WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to show user ${id}: ${err}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new weapon ${u.username}. Error: ${err}`);
    }
  }
  async authentication(
    username: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
  async delete(id: string): Promise<{ id: string }> {
    try {
      const sql = "DELETE FROM users WHERE id=($1) RETURNING id";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
