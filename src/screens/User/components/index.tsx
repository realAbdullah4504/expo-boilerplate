import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

import { styles } from "../styles";

const User = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { textAlign: "center", fontSize: 20, color: theme.colors.text },
        ]}
      >
        Tab Two
      </Text>
      <View style={styles.separator} />
    </View>
  );
};

export default User;
