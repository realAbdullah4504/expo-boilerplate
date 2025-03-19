import { useColorScheme } from "react-native";

import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return theme;
};
