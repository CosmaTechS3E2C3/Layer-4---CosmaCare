import { ENV } from "../config/env";

export function subscribeToRealtime(onEvent: (event: any) => void) {
  const source = new EventSource(
    `${ENV.apiBase.replace("/api", "")}/realtime/${ENV.realtimeChannel}`
  );

  source.onmessage = msg => {
    const data = JSON.parse(msg.data);
    onEvent(data);
  };

  return source;
}

