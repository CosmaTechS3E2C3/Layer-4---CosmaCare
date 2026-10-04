import { useState } from "react";
import { COSMACARE_API_BASE } from "../config";

export function useAPI() {
  const [loading, setLoading] = useState(false);

  async function request(method: string, path: string, body?: any) {
    setLoading(true);
    try {
      const res = await fetch(`${COSMACARE_API_BASE}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined
      });

      const data = await res.json();
      return { success: res.ok, data };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    get: (path: string) => request("GET", path),
    post: (path: string, body?: any) => request("POST", path, body),
    put: (path: string, body?: any) => request("PUT", path, body),
    del: (path: string) => request("DELETE", path)
  };
}

