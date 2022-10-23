import Client from "../database";

export interface Weapon {
  id: number;
  name: string;
  type: string;
  weight: number;
}

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM mythical_weapons";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }
  async get(id: string): Promise<Weapon> {
    try {
      const sql = "SELECT * FROM mythical_weapons WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
  async create(w: Weapon): Promise<Weapon> {
    try {
      const sql =
        "INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [w.name, w.type, w.weight]);
      const weapon = result.rows[0];
      conn.release();
      return weapon;
    } catch (err) {
      throw new Error(`Could not add new weapon ${w.name}. Error: ${err}`);
    }
  }
  async delete(id: string): Promise<Weapon> {
    try {
      const sql = "DELETE FROM mythical_weapons WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const weapon = result.rows[0];
      conn.release();
      return weapon;
    } catch (err) {
      throw new Error(`Could not delete weapon ${id}. Error: ${err}`);
    }
  }
}
