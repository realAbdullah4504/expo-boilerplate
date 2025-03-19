import { router } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { LinkSuccess } from "react-native-plaid-link-sdk";

import { postRequest } from "@/services/request";

import {
  AccessTokenCreateResponseType,
  Balance,
  GetBalanceResponseType,
  LinkCreateResponseType,
  PlaidContextType,
  PlaidProviderProps,
} from "./types";

const PlaidContext = createContext<PlaidContextType | null>(null);

export const usePlaid = () => {
  const context = useContext(PlaidContext);
  if (!context) {
    throw new Error("usePlaid must be used within a PlaidProvider");
  }
  return context;
};

export const PlaidProvider = ({ children }: PlaidProviderProps) => {
  const [data, setData] = useState<Balance[] | null>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const createLinkToken = async () => {
    const payload = {
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      secret: process.env.EXPO_PUBLIC_SECRET,
      client_name: "Expo Boilerplate",
      country_codes: ["US"],
      language: "en",
      user: {
        client_user_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      },
      android_package_name: "com.expo.boilerplate",
      products: ["auth"],
    };
    const response = await postRequest<LinkCreateResponseType>(
      "/link/token/create",
      payload
    );
    setLinkToken(response.link_token);
  };

  const handleSuccess = async (success: LinkSuccess) => {
    const payload = {
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      secret: process.env.EXPO_PUBLIC_SECRET,
      public_token: success.publicToken,
    };
    const response = await postRequest<AccessTokenCreateResponseType>(
      "/item/public_token/exchange",
      payload
    );
    setAccessToken(response.access_token);
    router.navigate("success");
  };

  const getBalance = async () => {
    const payload = {
      client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
      secret: process.env.EXPO_PUBLIC_SECRET,
      access_token: accessToken,
    };
    const response = await postRequest<GetBalanceResponseType>(
      "/accounts/balance/get",
      payload
    );
    const balances = response?.accounts?.flatMap((account) => account.balances);
    setData(balances);
  };

  const value: PlaidContextType = {
    data,
    linkToken,
    createLinkToken,
    handleSuccess,
    getBalance,
  };

  return (
    <PlaidContext.Provider value={value}>{children}</PlaidContext.Provider>
  );
};
