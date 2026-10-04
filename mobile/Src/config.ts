import { Platform } from "react-native";

export const COSMACARE_API_BASE =
  process.env.EXPO_PUBLIC_COSMACARE_API_BASE || "http://localhost:8085/cosmacare";

export const COSMACARE_WS_URL =
  process.env.EXPO_PUBLIC_COSMACARE_WS_URL || "ws://localhost:8087";

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

