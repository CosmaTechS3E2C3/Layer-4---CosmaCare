module.exports = {
  apps: [
    {
      name: "sync-chain-events",
      script: "./workers/sync_chain_events.ts",
      watch: false
    },
    {
      name: "emit-realtime-events",
      script: "./workers/emit_realtime_events.ts",
      watch: false
    }
  ]
};
