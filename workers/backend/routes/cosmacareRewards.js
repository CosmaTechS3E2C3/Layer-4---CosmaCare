const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require("../config");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

router.get("/rewards", async (req, res) => {
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .order("minted_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/rewards/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

router.post("/rewards", async (req, res) => {
  const payload = req.body;

  const { data, error } = await supabase.from("rewards").insert(payload).select("*").single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;

