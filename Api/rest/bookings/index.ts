import { Request, Response } from "express";
import { pool } from "../../db"; // your pg client

export async function listBookings(req: Request, res: Response) {
  const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
  res.json(result.rows);
}

export async function getBooking(req: Request, res: Response) {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
  res.json(result.rows[0]);
}

export async function createBooking(req: Request, res: Response) {
  const { id, client_address, provider_address, service_id, scheduled_at } = req.body;
  await pool.query(
    `INSERT INTO bookings (id, client_address, provider_address, service_id, scheduled_at, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')`,
    [id, client_address, provider_address, service_id, scheduled_at]
  );
  res.status(201).json({ id });
}

