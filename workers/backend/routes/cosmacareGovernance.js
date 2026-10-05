const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = require("../config");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

router.get("/governance/proposals", async (req, res) => {
  const { data, error } = await supabase
    .from("governance_proposals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/governance/proposals", async (req, res) => {
  const payload = req.body;

  const { data, error } = await supabase
    .from("governance_proposals")
    .insert(payload)
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from("governance_events").insert({
    event_type: "governance.proposal.created",
    proposal_id: data.id,
    actor_address: data.proposer_address,
    payload: { title: data.title, policy_key: data.policy_key }
  });

  res.json(data);
});

router.post("/governance/proposals/:id/vote", async (req, res) => {
  const proposal_id = Number(req.params.id);
  const { voter_address, support } = req.body;

  const { data, error } = await supabase
    .from("governance_votes")
    .insert({ proposal_id, voter_address, support })
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });

  await supabase.from("governance_events").insert({
    event_type: "governance.vote.cast",
    proposal_id,
    actor_address: voter_address,
    payload: { support }
  });

  res.json(data);
});

router.get("/governance/policies", async (req, res) => {
  const { data, error } = await supabase.from("governance_policies").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;

