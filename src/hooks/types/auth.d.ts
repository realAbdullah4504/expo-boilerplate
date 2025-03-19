export interface AuthCredentialsType {
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isLogin: boolean;
  signUpUser: (credentials: AuthCredentialsType) => void;
  signInUser: (credentials: AuthCredentialsType) => void;
  googleAuth: () => void;
  signOutUser: () => void;
  appleAuth: () => void;
}
