"use client";

import type { ReactNode } from "react";
import { AuthProvider as SupabaseAuthProvider } from "@/context/AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
