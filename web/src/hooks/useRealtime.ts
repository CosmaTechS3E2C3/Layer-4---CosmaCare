import { useEffect } from "react";
import { ENV } from "../config";
import { Events } from "../realtime/events";

export function useRealtime(onEvent: (event: any) => void) {
  useEffect(() => {
    const source = new EventSource(
      `${ENV.apiBase.replace("/api", "")}/realtime/${ENV.realtimeChannel}`
    );

    source.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (Object.values(Events).includes(data.event)) {
        onEvent(data);
      }
    };

    return () => source.close();
  }, [onEvent]);
}
