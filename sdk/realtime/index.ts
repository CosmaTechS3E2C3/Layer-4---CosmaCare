import { SDK_CONFIG } from "../config";

export function subscribe(callback: (event: any) => void) {
  const channel = new EventSource(`/realtime/${SDK_CONFIG.realtimeChannel}`);

  channel.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    callback(data);
  };

  return channel;
}

