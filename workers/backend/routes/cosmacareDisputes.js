const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require("../config");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

router.get("/disputes", async (req, res) => {
  const { data, error } = await supabase
    .from("disputes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/disputes", async (req, res) => {
  const { bookingId, reason, raised_by, actor_address } = req.body;

  const { data, error } = await supabase.from("disputes").insert({
    booking_id: bookingId,
    reason,
    raised_by: raised_by || "client",
    status: "open"
  }).select("*").single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from("governance_events").insert({
    event_type: "dispute.opened",
    proposal_id: null,
    actor_address,
    payload: { bookingId, reason }
  });

  res.json(data);
});

router.put("/disputes/:id/resolve", async (req, res) => {
  const id = Number(req.params.id);
  const { resolutionNote, status, actor_address } = req.body;

  const { data, error } = await supabase
    .from("disputes")
    .update({
      resolution_note: resolutionNote,
      status,
      resolved_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from("governance_events").insert({
    event_type: "dispute.resolved",
    proposal_id: null,
    actor_address,
    payload: { disputeId: id, status }
  });

  res.json(data);
});

module.exports = router;

