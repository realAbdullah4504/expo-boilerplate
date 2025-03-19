import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/hooks/useTheme";

const Settings = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Text
        style={{ textAlign: "center", fontSize: 20, color: theme.colors.text }}
      >
        Setting page
      </Text>
    </SafeAreaView>
  );
};

export default Settings;
