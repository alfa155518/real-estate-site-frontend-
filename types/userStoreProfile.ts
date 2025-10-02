export interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: string | undefined;
}

export interface ProfileStoreState {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  initialize: () => string | null;
  setUser: (user: User | null) => void;
  handleLogout: () => Promise<void>;
}