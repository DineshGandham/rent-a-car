export interface User {
    name: string;
    email: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  