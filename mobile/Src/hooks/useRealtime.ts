import { useEffect, useState } from "react";
import { COSMACARE_WS_URL } from "../config";

export function useRealtime() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(COSMACARE_WS_URL);

    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        setEvents((prev) => [event, ...prev]);
      } catch (_) {}
    };

    return () => ws.close();
  }, []);

  return { events };
}

