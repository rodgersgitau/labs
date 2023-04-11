import { createContext, FC, ReactNode, useContext, useState } from "react";

import { AuthError, Session, User } from "@supabase/supabase-js";

import { supabase } from "../supabase";

export interface AuthContextType {
  user: User | null;
  error: AuthError | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const signIn = async (email: string, password: string) => {
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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      void setError(error);
    }

    void setUser(null);
    void setSession(null);
    return;
  };

  const value = { user, error, session, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  try {
    return useContext(AuthContext);
  } catch (error) {
    throw new Error(error as string);
  }
};

export default useAuth;
