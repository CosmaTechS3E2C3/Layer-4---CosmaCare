const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require("../config");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

router.get("/bookings", async (req, res) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/bookings/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

router.post("/bookings", async (req, res) => {
  const payload = req.body;
  const { data, error } = await supabase.from("bookings").insert(payload).select("*").single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.put("/bookings/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const { data, error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;

