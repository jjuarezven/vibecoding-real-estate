"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { useTranslation } from "@/context/LanguageContext";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const { t } = useTranslation();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthErrorMessage = useCallback(
    (error: unknown) => {
      if (error instanceof Error && error.message) return error.message;
      return t("login.error");
    },
    [t]
  );

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!isMounted) return;
      if (sessionError) setError(getAuthErrorMessage(sessionError));
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, getAuthErrorMessage]);

  const signInWithProvider = useCallback(
    async (provider: "google" | "github") => {
      setLoading(true);
      setError(null);

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signInError) {
        setLoading(false);
        setError(getAuthErrorMessage(signInError));
      }
    },
    [supabase, getAuthErrorMessage]
  );

  const signInWithGoogle = useCallback(
    () => signInWithProvider("google"),
    [signInWithProvider]
  );

  const signInWithGithub = useCallback(
    () => signInWithProvider("github"),
    [signInWithProvider]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(getAuthErrorMessage(signOutError));
    setLoading(false);
  }, [supabase, getAuthErrorMessage]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      error,
      signInWithGoogle,
      signInWithGithub,
      signOut,
      clearError: () => setError(null),
    }),
    [
      session,
      loading,
      error,
      signInWithGoogle,
      signInWithGithub,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
