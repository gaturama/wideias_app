import { supabase } from "../../utils/supabase";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export class AuthService {
  static async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error || !data.user) {
        return { success: false, error: error?.message };
      }

      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email!,
        },
      };
    } catch {
      return { success: false, error: "Erro ao fazer login" };
    }
  }

  static async logout(): Promise<void> {
    await supabase.auth.signOut();
  }
}
