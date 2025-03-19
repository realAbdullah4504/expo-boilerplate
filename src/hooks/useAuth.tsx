import * as AppleAuthentication from "expo-apple-authentication";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";
import {
  AuthContextType,
  AuthCredentialsType,
  AuthProviderProps,
} from "./types";

const AuthContext = createContext<AuthContextType | null>(null);
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (Platform.OS === "android") {
      GoogleSignin.configure({
        webClientId,
        scopes: ["profile", "email"],
      });
    }
  }, []);

  const signUpUser = async ({ email, password }: AuthCredentialsType) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInUser({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  const signInUser = async ({ email, password }: AuthCredentialsType) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setType("email");
      setIsLogin(true);
      router.replace("(tabs)");
    } catch (error) {
      console.error(error);
      setIsLogin(false);
    }
  };

  const googleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      setType("google");
      setIsLogin(true);
      router.replace("(tabs)");
    } catch (error) {
      console.error(error);
    }
  };
  const appleAuth = async () => {
    const appleCredential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    const { identityToken } = appleCredential;
    if (identityToken) {
      const provider = new OAuthProvider("apple.com");
      provider.addScope("email");
      provider.addScope("name");
      const credential = provider.credential({ idToken: identityToken });
      await signInWithCredential(auth, credential);
    }
  };

  const signOutUser = async () => {
    try {
      if (type === "google") {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      await signOut(auth);
      router.navigate("sign-in");
      setType("");
      setIsLogin(false);
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue: AuthContextType = {
    isLogin,
    signUpUser,
    signInUser,
    signOutUser,
    googleAuth,
    appleAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
