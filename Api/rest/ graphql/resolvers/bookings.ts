import { pool } from "../db";

export const BookingResolvers = {
  Query: {
    bookings: async () => {
      const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
      return result.rows;
    },
    booking: async (_: any, { id }: { id: number }) => {
      const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
      return result.rows[0];
    }
  }
};

