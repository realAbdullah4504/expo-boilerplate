import { Stack } from "expo-router";

import { ThemeProvider } from "@react-navigation/native";

import { AuthProvider, PlaidProvider } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";

export default function RootLayout() {
  return (
    <AuthProvider>
      <PlaidProvider>
        <RootLayoutNav />
      </PlaidProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme();
  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sign-in"
          options={{ presentation: "modal", headerShown: false }}
        />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
