import { StyleSheet } from "react-native";
import { Colors } from "./theme";

export const createThemedStyles = (isDark: boolean = true) => {
  const theme = isDark ? Colors.dark : Colors.light;

  const basicFlex = {
    flexDirection: "column",
    flexWrap: "nowrap",
  } as const;

  return StyleSheet.create({
    container: {
      ...basicFlex,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 25,
      backgroundColor: theme.darkBackground,
    },
    text: {
      color: theme.lightForeground,
    },
    title: {
      color: theme.lightForeground,
      fontSize: 20,
      fontWeight: "bold",
    },
  });
};
