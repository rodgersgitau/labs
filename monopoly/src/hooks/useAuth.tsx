import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthError, Session, User } from "@supabase/supabase-js";

import { supabase } from "../supabase";

export interface AuthContextType {
  user: User | null;
  error: AuthError | null;
  session: Session | null;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      void setUser(data.user);
      void setSession(data.session);
    }
    if (error) {
      void setError(error);
    }
    return;
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log({ data });
  };

  const signInWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log({ data });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      void setError(error);
    }

    void setUser(null);
    void setSession(null);
    return;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("sb-kemegrzkhiqfuigrsnvm-auth-token");
      if (user && user !== null) {
        setUser(JSON.parse(user) as User);
      }
    }
  }, []);

  const value = {
    user,
    error,
    session,
    signInWithEmail,
    signInWithGoogle,
    signInWithDiscord,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  try {
    return useContext(AuthContext);
  } catch (error) {
    throw new Error(error as string);
  }
};

export default useAuth;
