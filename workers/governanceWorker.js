const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function startGovernanceWorker() {
  const channel = supabase.channel("cosmacare");

  channel
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "governance_events" }, (payload) => {
      console.log("Governance event:", payload.new);
      // push to websocket, log, etc.
    })
    .subscribe();
}

startGovernanceWorker().catch(console.error);
