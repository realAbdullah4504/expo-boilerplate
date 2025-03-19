import { StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    heading: {
      alignItems: "center",
      paddingHorizontal: 32,
      justifyContent: "flex-start",
      backgroundColor: "#FFFFFF",
      paddingBottom: 32,
    },
    body: {
      flex: 1,
      paddingHorizontal: 32,
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      backgroundColor: theme.colors.card,
    },
    baseText: {
      fontSize: 16,
      marginTop: 8,
      color: "#4B4B4B",
      textAlign: "left",
    },
    titleText: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 36,
      marginHorizontal: 10,
    },
    bottom: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: theme.colors.card,
      paddingHorizontal: 32,
      paddingBottom: 32,
    },
    buttonContainer: {
      elevation: 4,
      backgroundColor: theme.colors.card,
      width: "100%",
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    buttonText: {
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: theme.colors.card,
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
  });
};
