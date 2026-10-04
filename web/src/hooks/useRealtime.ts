import { useEffect } from "react";

export function useRealtime(onEvent: (event: any) => void) {
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_COSMA_REALTIME_BASE + "/cosmacare");
    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        onEvent(event);
      } catch {
        // ignore
      }
    };
    return () => ws.close();
  }, [onEvent]);
}

