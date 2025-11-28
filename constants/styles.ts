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
    buttonContainer: {
      width: 225,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2,
      borderWidth: 4,
      borderColor: theme.lightForeground,
      borderRadius: 18,
    },
    button: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: theme.lightBackground,
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: theme.lightForeground,
      fontSize: 16,
    },
  });
};
