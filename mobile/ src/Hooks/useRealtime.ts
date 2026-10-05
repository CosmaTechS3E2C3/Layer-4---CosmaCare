import { useEffect } from "react";
import { subscribeToRealtime } from "../realtime/subscribe";
import { Events } from "../realtime/events";

export function useRealtime(onEvent: (event: any) => void) {
  useEffect(() => {
    const source = subscribeToRealtime((msg) => {
      // Only forward events that match your universal event map
      if (Object.values(Events).includes(msg.event)) {
        onEvent(msg);
      }
    });

    return () => {
      source.close();
    };
  }, [onEvent]);
}

