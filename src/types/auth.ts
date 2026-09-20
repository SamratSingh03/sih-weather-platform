export type UserRole = 'public' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city?: string;
  language?: string;
}

export type AuthModalType = 'public-login' | 'public-signup' | 'admin-login' | null;
