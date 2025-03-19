import { Button, Text, View } from "react-native";

import { useAuth } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";

import { styles } from "../styles";

export default function Home() {
  const { signOutUser } = useAuth();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { textAlign: "center", fontSize: 20, color: theme.colors.text },
        ]}
      >
        Tab One
      </Text>
      <Button title="signOut" onPress={signOutUser} />
      <View style={styles.separator} />
    </View>
  );
}
